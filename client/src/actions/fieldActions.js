import { ADD_FIELD, GET_FIELDS, DELETE_FIELD } from "../reducers/tutorialReducer";

import * as api from "../api/api.js";

export const getFields = (subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.getFields(subject);

    console.log(data);

    dispatch(GET_FIELDS(data));
  } catch (error) {
    console.log(error);
  }
};

export const addField = (field, subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.addField(field, subject);
    console.log(data);

    dispatch(ADD_FIELD(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteField = (name) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.deleteField(name);

    dispatch({ type: DELETE_FIELD, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};
