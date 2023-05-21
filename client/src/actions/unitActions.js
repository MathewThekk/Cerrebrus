import { ADD_UNIT, SET_UNITS, DELETE_UNIT } from "../reducers/learnReducers"

import * as api from "../api/api.js"

export const getUnits = (subject, field) => async (dispatch) => {
  try {
    const { data } = await api.getUnits(field, subject)

    dispatch(SET_UNITS(data))
  } catch (error) {
    console.log(error)
  }
}

export const addUnit = (unit, field, subject) => async (dispatch) => {
  try {
    const { data } = await api.addUnit(unit, field, subject)

    dispatch(ADD_UNIT(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteUnit = (name) => async (dispatch) => {
  try {
    const { data } = await api.deleteUnit(name)

    dispatch(DELETE_UNIT(data))
  } catch (error) {
    console.log(error)
  }
}
