import { ADD_SUBJECT, GET_SUBJECTS, DELETE_SUBJECT } from "../reducers/tutorialReducer";

import * as api from "../api/api.js";

export const getSubjects = () => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.getSubjects();


    dispatch(GET_SUBJECTS(data));
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

    dispatch({ type: DELETE_SUBJECT, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};
