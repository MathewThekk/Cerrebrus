import { ADD_TUTORIAL, SET_TUTORIALS, UPDATE_TUTORIAL, DELETE_TUTORIAL } from "../reducers/learnReducers"

import * as api from "../api/api.js"

export const addAdditionalInformation = (additionalInformationContent, tutorialId) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });
console.log(additionalInformationContent, tutorialId)
    const { data } = await api.addAdditionalInformation(additionalInformationContent, tutorialId)

    dispatch(SET_TUTORIALS(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateAdditionalInformation = (additionalInformationContent, tutorialId) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.updateAdditionalInformation(additionalInformationContent, tutorialId)

    dispatch(SET_TUTORIALS(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteAdditionalInformation = (additionalInformationContent, tutorialId) => async (dispatch) => {
    try {
      // dispatch({ type: START_LOADING });
  
      const { data } = await api.updateAdditionalInformation(additionalInformationContent, tutorialId)
  
      dispatch(SET_TUTORIALS(data))
    } catch (error) {
      console.log(error)
    }
  }
