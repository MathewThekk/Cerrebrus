import { ADD_UNIT, SET_UNITS, DELETE_UNIT, UPDATE_UNIT } from "../reducers/learnReducers"

import * as api from "../api/api.js"

export const getUnits = (subject, field, populateTutorial) => async (dispatch) => {
  try {

    const { data } = await api.getUnits(field, subject, populateTutorial)

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

export const deleteUnit = (unitName, field, subject) => async (dispatch) => {
  try {
    const { data } = await api.deleteUnit(unitName, field, subject)

    dispatch(DELETE_UNIT(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateUnitName = (newUnitName, unitName, field, subject) => async (dispatch) => {
  try {
    const { data } = await api.updateUnitName(newUnitName, unitName, field, subject)

    dispatch(UPDATE_UNIT(data))
  } catch (error) {
    console.log(error)
  }
}
