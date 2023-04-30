import { createSlice } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";

// Define the schema for each type of entity
const tutorialSchema = new schema.Entity("tutorials" ,{}, { idAttribute: "_id" });
const unitSchema = new schema.Entity("units", { tutorials: [tutorialSchema] }, { idAttribute: "_id" });
const fieldSchema = new schema.Entity("fields", { units: [unitSchema] }, { idAttribute: "_id" });
const subjectSchema = new schema.Entity("subjects", { fields: [fieldSchema] }, { idAttribute: "_id" });



const initialState = { entities: {} };

const tutorialSlice = createSlice({
  name: "tutorials",
  initialState: {
    entities: {
      tutorials: {},
    },
  },
  reducers: {
    GET_TUTORIALS: (state, action) => {
      // Normalize the response data and add it to the state
      const normalizedData = normalize(action.payload, [tutorialSchema]);
      state.entities = normalizedData.entities;
      console.log(state.entities)
    },
    ADD_TUTORIAL_PAGE: (state, action) => {
      // Add a new tutorial page to the state
      const normalizedData = normalize(action.payload, tutorialSchema);
      state.entities = {
        ...state.entities,
        ...normalizedData.entities,
      };
      console.log(state.entities)
    },
    UPDATE_TUTORIAL: (state, action) => {
      // Update an existing tutorial in the state
      const { id, ...tutorial } = action.payload;
      const normalizedData = normalize({ [id]: tutorial }, { [id]: tutorialSchema });
      state.entities = {
        ...state.entities,
        ...normalizedData.entities,
      };
    },
    DELETE_TUTORIAL: (state, action) => {
      // Remove a tutorial from the state
      const { id } = action.payload;
      const { [id]: removedTutorial, ...restOfTutorials } = state.entities.tutorials;
      state.entities.tutorials = restOfTutorials;
    },
  },
});

const unitSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    GET_UNITS: (state, action) => {
      // Normalize the response data and add it to the state
      const normalizedData = normalize(action.payload, [unitSchema]);
      state.entities = normalizedData.entities;
      console.log(state.entities);
    },
    ADD_UNIT: (state, action) => {
      // Add a new unit to the state
      const normalizedData = normalize(action.payload, unitSchema);
      state.entities = {
        ...state.entities,
        ...normalizedData.entities,
      };
    },
    UPDATE_UNIT: (state, action) => {
      // Update an existing unit in the state
      const { id, ...unit } = action.payload;
      const normalizedData = normalize({ [id]: unit }, { [id]: unitSchema });
      state.entities = {
        ...state.entities,
        ...normalizedData.entities,
      };
    },
    DELETE_UNIT: (state, action) => {
      // Remove a unit from the state
      const { id } = action.payload;
      const { [id]: removedUnit, ...restOfUnits } = state.entities.units;
      state.entities.units = restOfUnits;
    },
  },
});

const fieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    GET_FIELDS: (state, action) => {
      // Normalize the response data and add it to the state
      const normalizedData = normalize(action.payload, [fieldSchema]);
      state.entities = normalizedData.entities;
    },
    ADD_FIELD: (state, action) => {
      // Add a new field to the state
      const { _id, name, units } = action.payload;
      state.entities = {
        ...state.entities,
        fields: {
          ...state.entities.fields,
          [_id]: { _id, name, units },
        },
      };
      
    },
    UPDATE_FIELD: (state, action) => {
      // Update an existing field in the state
      const { id, ...field } = action.payload;
      const normalizedData = normalize({ [id]: field }, { [id]: fieldSchema });
      state.entities = {
        ...state.entities,
        ...normalizedData.entities,
      };
    },
    DELETE_FIELD: (state, action) => {
      // Remove a field from the state
      const { id } = action.payload;
      const { [id]: removedField, ...restOfFields } = state.entities.fields;
      state.entities.fields = restOfFields;
    },
  },
});

const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    GET_SUBJECTS: (state, action) => {
      const normalizedData = normalize(action.payload, [subjectSchema]);

      state.entities = normalizedData.entities;
      console.log("inside reducer", state.entities);
    },
    ADD_SUBJECT: (state, action) => {
      const { _id, name, subSubjects } = action.payload;
      state.entities = {
        ...state.entities,
        subjects: {
          ...state.entities.subjects,
          [_id]: { _id, name, subSubjects },
        },
      };
      console.log(state.entities);
    },
    UPDATE_SUBJECT: (state, action) => {
      // Update an existing subject in the state
      const { id, ...subject } = action.payload;
      const normalizedData = normalize({ [id]: subject }, { [id]: subjectSchema });
      state.entities = {
        ...state.entities,
        ...normalizedData.entities,
      };
    },
    DELETE_SUBJECT: (state, action) => {
      // Remove a subject from the state
      const { id } = action.payload;
      const { [id]: removedSubject, ...restOfSubjects } = state.entities.subjects;
      state.entities.subjects = restOfSubjects;
    },
  },
});

export const { GET_TUTORIALS, ADD_TUTORIAL_PAGE, UPDATE_TUTORIAL, DELETE_TUTORIAL } = tutorialSlice.actions;
export const { GET_UNITS, ADD_UNIT, UPDATE_UNIT, DELETE_UNIT } = unitSlice.actions;
export const { GET_FIELDS, ADD_FIELD, UPDATE_FIELD, DELETE_FIELD } = fieldSlice.actions;
export const { GET_SUBJECTS, ADD_SUBJECT, UPDATE_SUBJECT, DELETE_SUBJECT } = subjectSlice.actions;

export const reducers = {
  tutorialSlice,
  unitSlice,
  fieldSlice,
  subjectSlice,
};

export default reducers;
