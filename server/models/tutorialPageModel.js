import mongoose from "mongoose"

const tutorialPageSchema = new mongoose.Schema({
  pageType: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  chapterNumber: {
    type: Number,
    required: true,
  },
  chapterName: {
    type: String,
    required: true,
  },
  unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
})

const TutorialPage = mongoose.model("TutorialPage", tutorialPageSchema)

export default TutorialPage
