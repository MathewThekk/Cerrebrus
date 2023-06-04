import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  uid: { type: String, required: true }, // Firebase uid
  name: { type: String, required: true }, // Firebase displayName
  email: { type: String, required: true }, // Firebase email
  photoURL: { type: String }, // Firebase photoURL
  emailVerified: { type: Boolean, default: false }, // Firebase emailVerified
  providerData: [{
    providerId: String,
    uid: String,
    displayName: String,
    email: String,
    photoURL: String,
  }],
  createdAt: { type: Number }, // Firebase createdAt
  lastLoginAt: { type: Number }, // Firebase lastLoginAt
});

 const User = mongoose.model("User", userSchema);
 export default User
