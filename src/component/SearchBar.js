import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImportExportRoundedIcon from "@material-ui/icons/ImportExportRounded";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import { InputBase, Paper, Divider, Tooltip } from "@material-ui/core";
import IconActionButton from "./IconActionButton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "auto",
    borderColor: "#3f51b5",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  input: {
    flex: 1,
  },
}));

function SearchBar(props) {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <IconActionButton
        color="primary"
        ariaLabel="Sort"
        onClick={props.handleSort}
      >
        <Tooltip title="Sort">
          <ImportExportRoundedIcon />
        </Tooltip>
      </IconActionButton>
      <InputBase
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        className={classes.input}
        value={props.search}
        onChange={props.handleChange}
        name="search"
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconActionButton
        color="primary"
        ariaLabel="Add Task"
        onClick={props.handleClick}
      >
        <Tooltip title="Create Task">
          <AddCircleTwoToneIcon />
        </Tooltip>
      </IconActionButton>
    </Paper>
  );
}

export default SearchBar;
