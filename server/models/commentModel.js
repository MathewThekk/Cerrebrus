import mongoose from "mongoose"

const replySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

const commentSchema = new mongoose.Schema(
  {
    tutorialId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutorial", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    content: { type: String, required: true },
    replies: [replySchema],
  },
  { timestamps: true }
)

const Comment = mongoose.model("Comment", commentSchema)

export default Comment
