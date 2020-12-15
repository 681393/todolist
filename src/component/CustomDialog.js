import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";

function CustomDialog(props) {
  return (
    <Dialog
      open={props.showModal}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        <Typography color="primary" variant="h6" component="p">
          {props.title}
        </Typography>
      </DialogTitle>
      <DialogContent dividers children={props.children} />
      <DialogActions>
        <Button onClick={props.handleClose} color="secondary">
          Close
        </Button>
        <Button onClick={props.handleAction} color="primary">
          {props.buttonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
