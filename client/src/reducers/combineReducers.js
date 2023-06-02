import { combineReducers } from "redux"
import learnReducer from "./learnReducers.js"
import userReducer from "./userReducers.js"

const { tutorials, tutorialPage, comments, units, fields, subjects } = learnReducer
const { user } = userReducer

const rootReducer = combineReducers({
  tutorials,
  tutorialPage,
  comments,
  units,
  fields,
  subjects,
  user,
})

export default rootReducer
