import { SET_DB_USER } from "../reducers/userReducers";
import * as api from "../api/api.js";


export const userLogin = (subject) => async (dispatch) => {
  try {
    // dispatch({ type: START_LOADING });

    const { data } = await api.userLogin(subject);

    console.log(data);

    dispatch(SET_DB_USER(data.user));
  } catch (error) {
    console.log(error);
  }
};

// export const addUser = (field, subject) => async (dispatch) => {
//   try {
//     // dispatch({ type: START_LOADING });

//     const { data } = await api.addField(field, subject);
//     console.log(data);

//     dispatch(ADD_FIELD(data));
//   } catch (error) {
//     console.log(error);
//   }
// };