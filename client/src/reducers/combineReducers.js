import { combineReducers } from 'redux';
import reducer from './learnReducers.js';

const {tutorials, units, fields, subjects} = reducer;

const rootReducer = combineReducers({
  tutorials,
  units,
  fields,
  subjects
});

export default rootReducer;

