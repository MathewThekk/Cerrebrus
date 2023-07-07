import admin from "firebase-admin"
import UserAdmin from "../models/userAdminModel.js"
import firebaseServiceAccountKey from "../firebaseServiceAccountKey.json" assert { type: "json" }
import User from "../models/userModel.js"

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccountKey),
})

export const authenticationCheck = async (req, res, next) => {

  try {
    const authHeader = req.headers["authorization"]

    if (!authHeader) {
      return res.status(401).send("No Authorization header found")
    }

    const token = authHeader.split(" ")[1] // Bearer <token>
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

    const adminUser = await UserAdmin.findOne({ user: req.userId })

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
    // Get the environment variable based on the current NODE_ENV
    const envVariable = process.env.NODE_ENV === "production" ? "PRODUCTION_UIDS" : "DEVELOPMENT_UIDS"

    // Get the authorized UIDs from the environment variables
    const authorizedUids = process.env[envVariable].split(",")

    // Check if the user's UID is in the list of authorized UIDs
    if (authorizedUids.includes(req.firebaseUserUid)) {
      next()
    } else {
      res.status(403).send("User is not authorized to perform this action")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("Failed to check owner status")
  }
}
