import history from "../api/history";
import { SET_CURRENT_USER } from "../api/types";
import setJWTToken from "./setJWTToken";

export const accessDenied = (status, dispatch) => {
  if (status === 403) {
    setJWTToken(false);
    const action = {
      type: SET_CURRENT_USER,
      payload: "",
    };
    dispatch(action);
    history.push("/sessionExpired");
  }
};
