import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
  },
}));

const ActionButton = ({ color, value, type, disabled, onClick }) => {
  const classes = useStyles();
  return (
    <Button
      size="small"
      color={color}
      variant="outlined"
      className={classes.root}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </Button>
  );
};

export default ActionButton;
