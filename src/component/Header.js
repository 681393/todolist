import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Divider } from "@material-ui/core";

import LinkButton from "./LinkButton";
import { logout } from "../actionCreator/logout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  divider: {
    height: 28,
    margin: 6,
    backgroundColor: "#fff",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { validToken, user } = props.security;

  const handleLogout = () => {
    props.logout();
  };

  const userIsAuthenticated = (
    <>
      <Typography variant="button">{user.name}</Typography>
      <Divider orientation="vertical" className={classes.divider} />
      <LinkButton
        color="inherit"
        to="/"
        value="Logout"
        onClick={handleLogout}
      />
    </>
  );

  const userIsNotAuthenticated = (
    <>
      <LinkButton color="inherit" to="/" value="Login" />
      <LinkButton color="inherit" to="/signup" value="SignUp" />
    </>
  );

  let headerLinks;

  if (validToken && user) {
    headerLinks = userIsAuthenticated;
  } else {
    headerLinks = userIsNotAuthenticated;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TODO LIST
          </Typography>
          {headerLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { logout })(Header);
