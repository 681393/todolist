import axios from "axios";

const setJWTToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    localStorage.setItem("jwtToken", token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwtToken");
  }
};

export default setJWTToken;
