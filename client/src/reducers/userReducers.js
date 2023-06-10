import { createSlice } from "@reduxjs/toolkit"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { userLogin } from "../actions/loginAction"

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, dbUser: null },
  reducers: {
    SET_USER: (state, action) => {
      state.user = action.payload
      return state
    },
    SET_DB_USER: (state, action) => {
      state.dbUser = action.payload
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

export const { SET_USER, SET_DB_USER } = userSlice.actions

export const userReducers = {
  user: userSlice.reducer,
}

export default userReducers

//middleware to get user from firebase
export const syncAuthState = () => async (dispatch) => {
  const auth = getAuth()

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { displayName, email, photoURL, uid, emailVerified, providerData, createdAt, lastLoginAt } = user

      // Get the token result to access custom claims
      const idTokenResult = await user.getIdTokenResult()

      const isAdmin = idTokenResult.claims.admin || false

      // Save the token in local storage, along with the expiration time
      const expiresInMilliseconds = Date.parse(idTokenResult.expirationTime) // Convert to milliseconds

      localStorage.setItem("token", idTokenResult.token)
      localStorage.setItem("tokenExpiresAt", expiresInMilliseconds)

      const providerDetails = providerData[0] // If you want data from the first provider only
      dispatch(SET_USER({ uid, displayName, email, photoURL, emailVerified, providerData: providerDetails, isAdmin }))

      const userData = {
        name: displayName,
        email,
        photoURL,
        uid,
        emailVerified,
        providerData,
        createdAt,
        lastLoginAt,
      }
      dispatch(userLogin(userData))
    } else {
      // User is logged out, clear the token from local storage
      localStorage.removeItem("token")
      localStorage.removeItem("tokenExpiresAt")
      dispatch(SET_USER(null))
      dispatch(SET_DB_USER(null))
    }
  })
}
