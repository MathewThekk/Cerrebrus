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
  } catch (error) {
    console.log(error)
  }
}

export const updateTutorialPage = (tutorialPageData) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.updateTutorialPage(tutorialPageData)

    dispatch(UPDATE_TUTORIAL(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteTutorialPage = (tutorial) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });


    const { data } = await api.deleteTutorialPage(tutorial)

    dispatch(DELETE_TUTORIAL(data))
  } catch (error) {
    console.log(error)
  }
}
