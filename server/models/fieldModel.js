import mongoose from "mongoose"

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  units: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },
  ],
})

const Field = mongoose.model("Field", fieldSchema)

export default Field
