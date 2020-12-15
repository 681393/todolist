import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "auto",
  },
  link: {
    "&:hover": {
      color: "#F50057",
    },
    "&:active": {
      color: "#F50057",
    },
  },
}));

const SessionExpired = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      Your session has expired.{" "}
      <Link className={classes.link} to="/">
        Click here to login.
      </Link>
    </div>
  );
};

export default SessionExpired;
