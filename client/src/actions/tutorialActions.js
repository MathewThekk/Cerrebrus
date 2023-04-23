import { START_LOADING, GET_TUTORIAL, ADD_TUTORIAL } from '../constants/actionTypeConstants';
import * as api from '../api/api.js';

export const getTutorial = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.getTutorial(id);

    dispatch({ type: GET_TUTORIAL, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};
export const addTutorial = (currentUrl, slide, page ) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
    console.log(currentUrl)
 
    const { data } = await api.addTutorial(currentUrl, slide, page);

    dispatch({ type: ADD_TUTORIAL, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};





