import { START_LOADING, GET_TUTORIAL, ADD_TUTORIAL } from '../constants/actionTypeConstants';
import * as api from '../api/api.js';

export const getTutorial = (unit) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.getTutorial(unit);

    // dispatch({ type: GET_TUTORIAL, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};
export const addTutorial = (slide, page, unit, field, subject ) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
 
    const { data } = await api.addTutorial(slide, page, );

    dispatch({ type: ADD_TUTORIAL, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};





