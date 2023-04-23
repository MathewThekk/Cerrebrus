import { ADD_UNIT, GET_UNITS, DELETE_UNIT } from "../reducers/tutorialReducer";

import * as api from "../api/api.js";

export const getUnits = (subject, field) => async (dispatch) => {
  try {
    const { data } = await api.getUnits(field, subject);
    console.log(data);

    dispatch(GET_UNITS(data));
  } catch (error) {
    console.log(error);
  }
};

export const addUnit = (unit, field, subject) => async (dispatch) => {
  try {
    const { data } = await api.addUnit(unit, field, subject);
    console.log(data);

    dispatch(ADD_UNIT(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUnit = (name) => async (dispatch) => {
  try {
    const { data } = await api.deleteUnit(name);

    dispatch({ type: DELETE_UNIT, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};
