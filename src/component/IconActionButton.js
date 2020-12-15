import React from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
  },
}));

function IconActionButton(props) {
  const classes = useStyles();
  return (
    <IconButton
      aria-label={props.ariaLabel}
      color={props.color}
      onClick={props.onClick}
      children={props.children}
      className={classes.root}
      size={props.size}
    />
  );
}

export default IconActionButton;
