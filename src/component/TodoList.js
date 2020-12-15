import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Tooltip,
} from "@material-ui/core";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

import IconActionButton from "./IconActionButton";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 500,
    margin: "auto",
    wordWrap: "break-word",
  },
}));

function TodoList(props) {
  const classes = useStyles();
  return (
    <>
      {_.map(props.filteredTasks, (task) => (
        <div key={task.todoListId}>
          <Card className={classes.card}>
            <CardContent>
              <Typography color="secondary" variant="overline" display="block">
                {task.updatedTs}
              </Typography>
              <Typography color="primary">{task.task}</Typography>
            </CardContent>
            <CardActions>
              <IconActionButton
                ariaLabel="edit"
                color="primary"
                size="small"
                onClick={() => props.handleEdit(task)}
              >
                <Tooltip title="Edit Task">
                  <EditTwoToneIcon fontSize="small" />
                </Tooltip>
              </IconActionButton>
              <IconActionButton
                ariaLabel="delete"
                color="secondary"
                size="small"
                onClick={() => props.handleDelete(task.todoListId)}
              >
                <Tooltip title="Delete Task">
                  <DeleteTwoToneIcon fontSize="small" />
                </Tooltip>
              </IconActionButton>
            </CardActions>
          </Card>
          <br />
        </div>
      ))}
    </>
  );
}

export default TodoList;
