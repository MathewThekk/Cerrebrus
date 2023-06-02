import { createSlice } from "@reduxjs/toolkit"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    SET_USER: (state, action) => {
      state.user = action.payload
      return state
    },
    UPDATE_USER: (state, action) => {
      return action.payload
    },
    DELETE_USER: (state, action) => {
      return action.payload
    },
  },
})

export const { SET_USER } = userSlice.actions

export const userReducers = {
  user: userSlice.reducer,
}

export default userReducers

//middleware to get user from firebase
export const syncAuthState = () => async (dispatch) => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email, photoURL, emailVerified, providerData, isAnonymous } = user
      const providerDetails = providerData[0] // If you want data from the first provider only
      dispatch(SET_USER({ uid, displayName, email, photoURL, emailVerified, providerData: providerDetails, isAnonymous }))
    } else {
      dispatch(SET_USER(null))
    }
  })
}
