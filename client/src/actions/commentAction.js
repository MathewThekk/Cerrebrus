import { ADD_COMMENT, SET_COMMENTS, DELETE_COMMENT, UPDATE_COMMENT } from "../reducers/learnReducers"

import * as api from "../api/api.js"

export const getComments = (tutorialId) => async (dispatch) => {
  try {
    const { data } = await api.getComments(tutorialId)

    dispatch(SET_COMMENTS(data))
  } catch (error) {
    console.log(error)
  }
}

export const addComment = (content, tutorialId) => async (dispatch) => {
  try {
    const { data } = await api.addComment(content, tutorialId)

    console.log(data)

    dispatch(ADD_COMMENT(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const { data } = await api.deleteComment(commentId)

    dispatch(DELETE_COMMENT(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateComment = (content, commentId) => async (dispatch) => {
  try {
    const { data } = await api.updateComment(content, commentId)

    dispatch(UPDATE_COMMENT(data))
  } catch (error) {
    console.log(error)
  }
}
