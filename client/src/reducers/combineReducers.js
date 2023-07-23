import { combineReducers } from "redux"
import learnReducer from "./learnReducers.js"
import userReducer from "./userReducers.js"
import loadingReducer from './loadingReducer.js';


const { tutorials, tutorialPage,editMode, comments, units, fields, subjects } = learnReducer
const { user } = userReducer


const rootReducer = combineReducers({
  tutorials,
  tutorialPage,
  editMode,
  comments,
  units,
  fields,
  subjects,
  user,
  loading: loadingReducer,
})

export default rootReducer
