import { createSlice } from "@reduxjs/toolkit"

const loadingSlice = createSlice({
  name: "loading",
  initialState: { loading: false, spinner: false },
  reducers: {
    START_LOADING: (state) => {
      state.loading = true;
    },
    STOP_LOADING: (state) => {
      state.loading = false;
    },
    SET_SPINNER: (state, action) => {
      state.spinner = action.payload;
    }
  },
})

export const { START_LOADING, STOP_LOADING, SET_SPINNER } = loadingSlice.actions

export default loadingSlice.reducer
