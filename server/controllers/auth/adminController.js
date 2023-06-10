import User from "../../models/userModel.js"
import UserAdmin from "../../models/userAdminModel.js"
import admin from "firebase-admin"

export const addAdmin = async (req, res) => {
  const { uid: newAdminUid } = req.headers // newAdminUid should be sent from frontend

  try {
    // Check if the user exists in the User collection
    const user = await User.findOne({ uid: newAdminUid })

    if (!user) {
      return res.status(400).send("User does not exist")
    }

    // Check if the user to be added as admin is already an admin
    const existingUser = await User.findOne({uid: newAdminUid})
    const existingAdminUser = await UserAdmin.findOne({user: existingUser._id})

    if (existingAdminUser) {
      return res.status(400).send("User is already an admin")
    }

    // Add new user to the admin list in MongoDB
    const newUserAdmin = new UserAdmin({ user: user._id })
    await newUserAdmin.save()

    // Set the custom claim in Firebase
    await admin.auth().setCustomUserClaims(newAdminUid, { admin: true })

    return res.send("New admin added successfully")
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal Server Error")
  }
}

export const getAdmin = async (req, res) => {
  const { uid } = req.headers // uid should be sent from frontend

  try {
    // Check if the user is an admin

    const user = await User.findOne({uid: uid})
    const userAdmin = await UserAdmin.findOne( {user: user._id})

    if (!userAdmin) {
      return res.status(400).send("User is not an admin")
    }

    // Check the custom claim in Firebase
    const fireBaseUser = await admin.auth().getUser(uid)
    const isAdmin = fireBaseUser.customClaims && fireBaseUser.customClaims.admin

    if (!isAdmin) {
      return res.status(400).send("User is not marked as admin in Firebase")
    }

    return res.send("User is admin in backend and firebase")
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal Server Error")
  }
}

export const deleteAdmin = async (req, res) => {
  const { uid } = req.headers // uid should be sent from frontend

  try {
    // Check if the user is an admin
    const user = await User.findOne({uid: uid})
    const userAdmin = await UserAdmin.findOne( {user: user._id})
    if (!userAdmin) {
      return res.status(400).send("User is not an admin")
    }

    // Remove the user from the MongoDB admin collection
    await UserAdmin.deleteOne({ _id: userAdmin._id })

    // Check the custom claim in Firebase
    const firebaseUser = await admin.auth().getUser(uid)
    const isAdmin = firebaseUser.customClaims && firebaseUser.customClaims.admin

    if (isAdmin) {
      // Remove the custom claim in Firebase
      await admin.auth().setCustomUserClaims(uid, { admin: false })
    }

    return res.send("Admin rights removed successfully in db and firebase")
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal Server Error")
  }
}
