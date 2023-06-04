import mongoose from "mongoose"

const userAdminSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This is the name of the model you're referencing
    required: true,
  },
})

const UserAdmin = mongoose.model("UserAdmin", userAdminSchema)
export default UserAdmin
