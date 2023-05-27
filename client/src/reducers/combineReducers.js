import { combineReducers } from 'redux';
import reducer from './learnReducers.js';

const {tutorials,comments, units, fields, subjects} = reducer;

const rootReducer = combineReducers({
  tutorials,
  comments,
  units,
  fields,
  subjects
});

export default rootReducer;

