import { createSlice } from "@reduxjs/toolkit"


const loadingSlice = createSlice({
  name: "loading",
  initialState: true,
  reducers: {
    START_LOADING: state => true,
    STOP_LOADING: state => false
  }
})

export const {  START_LOADING, STOP_LOADING } = loadingSlice.actions;

export default loadingSlice.reducer


