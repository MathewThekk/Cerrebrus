import User from "../../models/userModel.js"

export const userLogin = async (req, res) => {
  const { uid, name, email, photoURL, emailVerified, providerData, createdAt, lastLoginAt } = req.body

  try {
    const user = await User.findById(req.userId)

    // If the user doesn't exist, create a new user
    if (!user) {
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

      const newUser = await user.save()
      res.status(201).json({ message: "New user created!", newUser })
    } else {
      // If user already exists, simply return the user
      res.status(200).json({ message: "User signed in!", user })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error")
  }
}
