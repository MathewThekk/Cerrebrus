import { ADD_SUBJECT, SET_SUBJECTS, DELETE_SUBJECT } from "../reducers/learnReducers";

import * as api from "../api/api.js";

export const getSubjects = () => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.getSubjects();


    dispatch(SET_SUBJECTS(data));
  } catch (error) {
    console.log(error);
  }
};
export const addSubject = (subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.addSubject(subject);

    dispatch(ADD_SUBJECT(data));
  } catch (error) {
    console.log(error);
  }
};
export const deleteSubject = (name) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.deleteSubject(name);

    dispatch(ADD_SUBJECT(data));
  } catch (error) {
    console.log(error);
  }
};
