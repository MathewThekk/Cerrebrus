import { ADD_TUTORIAL_PAGE, GET_TUTORIALS, GET_TUTORIAL_PAGE } from "../reducers/tutorialReducer";

import * as api from "../api/api.js";

export const getTutorials = (unit, field, subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.getTutorials(unit, field, subject);
    console.log(data);

    dispatch(GET_TUTORIALS(data));
  } catch (error) {
    console.log(error);
  }
};
export const getTutorialPage = (page, chapter, unit, field, subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.getTutorialPage(page, chapter, unit, field, subject);

    // dispatch({ type: GET_TUTORIAL, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};
export const addTutorialPage = (pageType, content, page, chapter, unit, field, subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.addTutorialPage(pageType, content, page, chapter, unit, field, subject);
    console.log(data);

    dispatch(ADD_TUTORIAL_PAGE(data));
  } catch (error) {
    console.log(error);
  }
};
