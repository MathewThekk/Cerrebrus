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
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { uid, displayName, email, photoURL, emailVerified, providerData } = user

      // Get the token result to access custom claims
      const idTokenResult = await user.getIdTokenResult()
      const isAdmin = idTokenResult.claims.admin || false

      // Save the token in local storage, along with the expiration time
      const expiresInMilliseconds = Date.parse(idTokenResult.expirationTime) // Convert to milliseconds

      localStorage.setItem("token", idTokenResult.token)
      localStorage.setItem("tokenExpiresAt", expiresInMilliseconds)

      const providerDetails = providerData[0] // If you want data from the first provider only
      dispatch(SET_USER({ uid, displayName, email, photoURL, emailVerified, providerData: providerDetails, isAdmin }))
    } else {
      // User is logged out, clear the token from local storage
      localStorage.removeItem("token")
      localStorage.removeItem("tokenExpiresAt")
      dispatch(SET_USER(null))
    }
  })
}
