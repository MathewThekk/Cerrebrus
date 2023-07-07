import { ADD_TUTORIAL, SET_TUTORIALS, UPDATE_TUTORIAL, DELETE_TUTORIAL } from "../reducers/learnReducers"

import * as api from "../api/api.js"

export const getTutorials = (unit, field, subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.getTutorials(unit, field, subject)

    dispatch(SET_TUTORIALS(data))
  } catch (error) {
    console.log(error)
  }
}

export const addTutorialPage = (tutorialPageData) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.addTutorialPage(tutorialPageData)

    dispatch(ADD_TUTORIAL(data))
    console.log("successfully saved content")
  } catch (error) {
    console.log(error)
  }
}

export const updateTutorialPage = (tutorialPageData) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.updateTutorialPage(tutorialPageData)

    dispatch(UPDATE_TUTORIAL(data))
    console.log("successfully saved content")
  } catch (error) {
    console.log(error)
  }
}

export const updateTutorialChapterName = (newChapterName, chapterNumber, unitName, field, subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.updateTutorialChapterName(newChapterName, chapterNumber, unitName, field, subject)

    dispatch(UPDATE_TUTORIAL(data))
  } catch (error) {
    console.log(error)
  }
}
export const updateTutorialChapterNumber = (newChapterNumber, tutorialId) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.updateTutorialChapterNumber(newChapterNumber, tutorialId)

    dispatch(UPDATE_TUTORIAL(data))
  } catch (error) {
    console.log(error)
  }
}

// export const deleteTutorialPage = (tutorial) => async (dispatch) => {
//   try {
//     // dispatch({ type: START_LOADING });

//     const { data } = await api.deleteTutorialPage(tutorial)

//     dispatch(DELETE_TUTORIAL(data))
//   } catch (error) {
//     console.log(error)
//   }
// }

export const deleteChapter = (tutorialId) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.deleteChapter(tutorialId)

    dispatch(DELETE_TUTORIAL(data))
  } catch (error) {
    console.log(error)
  }
}
