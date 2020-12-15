import axios from "axios";
import jwt_decode from "jwt-decode";

import setJWTToken from "../security/setJWTToken";
import { SET_CURRENT_USER, LOGIN_ERROR } from "../api/types";

export const userlogin = (userLoginData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/login", userLoginData);

    const { jwt } = res.data;

    setJWTToken(jwt);

    const decodedToken = jwt_decode(jwt);

    dispatch({ type: SET_CURRENT_USER, payload: decodedToken });
  } catch (err) {
    dispatch({ type: LOGIN_ERROR, payload: err.response.data });
  }
};
