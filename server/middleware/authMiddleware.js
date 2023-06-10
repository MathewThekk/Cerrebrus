import admin from "firebase-admin"
import UserAdmin from "../models/userAdminModel.js"
import firebaseServiceAccountKey from "../firebaseServiceAccountKey.json" assert { type: "json" }
import User from "../models/userModel.js"
// Path to your JSON private key

// let serviceAccount = JSON.parse(process.env.FIREBASE_PRIVATE_KEY)

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccountKey),
})

export const authenticationCheck = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1] // Bearer <token>
    const decodedToken = await admin.auth().verifyIdToken(token)

    if (decodedToken) {
      req.firebaseUserUid = decodedToken.uid
      let user = await User.findOne({ uid: decodedToken.uid })

      req.userId = user?._id

      next()
    } else {
      res.status(401).send("Invalid Token")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Authentication failed")
  }
}

export const adminAuthorisationCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin.auth().getUser(req.firebaseUserUid)

    const adminUser = await UserAdmin.findOne({ user: req.userId})

    if (firebaseUser.customClaims && firebaseUser.customClaims.admin === true && adminUser) {
      next()
    } else {
      res.status(403).send("User is not an admin")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Failed to check admin status")
  }
}

export const superAdminCheck = async (req, res, next) => {
  try {

    // Replace 'YOUR_UID' with your Firebase uid
    if (req.firebaseUserUid === 'eyWpV80tMHQ11tLuIkVwBweshOn2') {
      next()
    } else {
      res.status(403).send("User is not authorized to perform this action")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Failed to check owner status")
  }
}
