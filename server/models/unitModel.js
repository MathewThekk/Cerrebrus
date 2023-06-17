import mongoose from "mongoose"

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  field: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Field",
    required: true,
  },
  tutorialIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial",
    },
  ]
})

const Unit = mongoose.model("Unit", unitSchema)

export default Unit
