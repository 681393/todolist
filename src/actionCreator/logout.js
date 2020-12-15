import { SET_CURRENT_USER } from "../api/types";
import setJWTToken from "../security/setJWTToken";

export const logout = () => {
  setJWTToken(false);
  return { type: SET_CURRENT_USER, payload: "" };
};
