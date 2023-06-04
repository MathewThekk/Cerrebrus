import User from "../../models/userModel.js"

export const userLogin = async (req, res) => {
  const { uid, name, email, photoURL, emailVerified, providerData, createdAt, lastLoginAt } = req.body

  try {
    console.log(req.userId)
    // If the user doesn't exist, create a new user
    if (!req.userId) {
      const user = new User({
        uid,
        name,
        email,
        photoURL,
        emailVerified,
        providerData,
        createdAt,
        lastLoginAt,
      })

      await user.save()
      res.status(201).json({ message: "New user created!", user })
    } else {
      // If user already exists, simply return the user
      res.json({ message: "User signed in!" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
}
