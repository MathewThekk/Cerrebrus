import mongoose from "mongoose";


const tutorialSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  slide: {
    type: String,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },

});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

export default Tutorial
