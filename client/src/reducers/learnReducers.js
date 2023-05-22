import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {}

const tutorialSlice = createSlice({
  name: "tutorials",
  initialState,
  reducers: {
    SET_TUTORIALS: (state, action) => {
      return action.payload
    },
    ADD_TUTORIAL: (state, action) => {
      return action.payload
    },
    UPDATE_TUTORIAL: (state, action) => {
      return action.payload
    },
    DELETE_TUTORIAL: (state, action) => {
      return action.payload
    },
  },
})

const unitSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    SET_UNITS: (state, action) => {
      return { ...state, ...action.payload }
    },
    ADD_UNIT: (state, action) => {
      return { ...state, ...action.payload }
    },
    UPDATE_UNIT: (state, action) => {
      return { ...state, ...action.payload }
    },
    DELETE_UNIT: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

const fieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    SET_FIELDS: (state, action) => {
      return { ...state, ...action.payload }
    },
    ADD_FIELD: (state, action) => {
      state[action.payload._id] = action.payload
    },
    UPDATE_FIELD: (state, action) => {
      state[action.payload._id] = action.payload
    },
    DELETE_FIELD: (state, action) => {
      delete state[action.payload._id]
    },
  },
})

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    SET_SUBJECTS: (state, action) => {
      return { ...state, ...action.payload }
    },
    ADD_SUBJECT: (state, action) => {
      state[action.payload._id] = action.payload
    },
    UPDATE_SUBJECT: (state, action) => {
      state[action.payload._id] = action.payload
    },
    DELETE_SUBJECT: (state, action) => {
      delete state[action.payload._id]
    },
  },
})

export const { SET_TUTORIALS, ADD_TUTORIAL, UPDATE_TUTORIAL, DELETE_TUTORIAL } = tutorialSlice.actions
export const { SET_UNITS, ADD_UNIT, UPDATE_UNIT, DELETE_UNIT } = unitSlice.actions
export const { SET_FIELDS, ADD_FIELD, UPDATE_FIELD, DELETE_FIELD } = fieldSlice.actions
export const { SET_SUBJECTS, ADD_SUBJECT, UPDATE_SUBJECT, DELETE_SUBJECT } = subjectSlice.actions

export const reducers = {
  tutorials: tutorialSlice.reducer,
  units: unitSlice.reducer,
  fields: fieldSlice.reducer,
  subjects: subjectSlice.reducer,
}

export default reducers