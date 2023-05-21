import mongoose from "mongoose"

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fields: [{ type: mongoose.Schema.Types.ObjectId, ref: "Field", required: false }],
})

const Subject = mongoose.model("Subject", subjectSchema)

export default Subject
