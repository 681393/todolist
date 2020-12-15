import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import createBrowserHistory from "./api/history";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import SessionExpired from "./component/SessionExpired";
import { SET_CURRENT_USER } from "./api/types";
import Header from "./component/Header";
import setJWTToken from "./security/setJWTToken";
import store from "./api/store";
import { logout } from "./actionCreator/logout";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decodedToken = jwt_decode(jwtToken);
  store.dispatch({ type: SET_CURRENT_USER, payload: decodedToken });

  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={createBrowserHistory}>
          <Header />
          <br />
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/home" exact component={Home} />
            <Route path="/sessionExpired" exact component={SessionExpired} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
