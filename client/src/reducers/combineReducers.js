import { combineReducers } from 'redux';
import reducer from './learnReducers.js';

const {tutorials, tutorialPage, comments, units, fields, subjects} = reducer;

const rootReducer = combineReducers({
  tutorials,
  tutorialPage,
  comments,
  units,
  fields,
  subjects
});

export default rootReducer;

