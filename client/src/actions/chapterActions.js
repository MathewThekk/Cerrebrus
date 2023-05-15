import { ADD_CHAPTER_PAGE, GET_CHAPTERS, GET_CHAPTER_PAGE } from "../reducers/tutorialReducer";

import * as api from "../api/api.js";

export const getChapters = (unit, field, subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.getChapters(unit, field, subject);
    console.log(data);

    dispatch(GET_CHAPTERS(data));
  } catch (error) {
    console.log(error);
  }
};
export const getChapterPage = (page, chapter, unit, field, subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.getChapterPage(page, chapter, unit, field, subject);

    // dispatch({ type: GET_CHAPTER, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};
export const addChapterPage = (pageType, content, page, chapter, unit, field, subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.addChapterPage(pageType, content, page, chapter, unit, field, subject);
    console.log(data);

    dispatch(ADD_CHAPTER_PAGE(data));
  } catch (error) {
    console.log(error);
  }
};

