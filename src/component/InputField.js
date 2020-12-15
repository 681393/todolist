import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

const InputField = ({
  label,
  onChange,
  required,
  error,
  helperText,
  autofocus,
  multiline,
  rows,
  ...inputProps
}) => {
  const classes = useStyles();
  return (
    <TextField
      label={label}
      variant="outlined"
      onChange={(e) => onChange(e)}
      inputProps={inputProps}
      className={classes.root}
      fullWidth
      autoComplete="off"
      required={required}
      error={error ? true : false}
      helperText={helperText}
      autoFocus={autofocus}
      multiline={multiline}
      rows={rows}
    />
  );
};

export default InputField;
