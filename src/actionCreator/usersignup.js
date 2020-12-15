import axios from "axios";

import { SIGNUP_ERROR } from "../api/types";

export const usersignup = (userSignUpData, history) => async (dispatch) => {
  try {
    await axios.post("/api/signup", userSignUpData);
    history.push("/");
  } catch (err) {
    dispatch({ type: SIGNUP_ERROR, payload: err.response.data });
  }
};
