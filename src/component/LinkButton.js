import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      color: "#F50057",
    },
    "&:active": {
      color: "#F50057",
    },
  },
}));

const LinkButton = ({ color, value, to, onClick }) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      color={color}
      component={Link}
      to={to}
      onClick={onClick}
    >
      {value}
    </Button>
  );
};

export default LinkButton;
