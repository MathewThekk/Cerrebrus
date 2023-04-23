import { combineReducers } from 'redux';
import reducer from './tutorialReducer.js';

const {tutorialSlice, unitSlice, subjectSlice, fieldSlice} = reducer;

const rootReducer = combineReducers({
  tutorials: tutorialSlice.reducer,
  units: unitSlice.reducer,
  fields: fieldSlice.reducer,
  subjects: subjectSlice.reducer,
});

export default rootReducer;

