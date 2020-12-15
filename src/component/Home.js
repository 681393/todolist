import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import validator from "validator";

import { getTodoList, deleteTask, saveTask } from "../actionCreator";
import SearchBar from "./SearchBar";
import TodoList from "./TodoList";
import CustomDialog from "./CustomDialog";
import InputField from "./InputField";
import CustomBackdrop from "./CustomBackdrop";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      showModal: false,
      task: "",
      search: "",
      taskError: "",
      taskId: "",
      showDeleteModal: false,
      deleteTaskId: "",
      sort: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.props.getTodoList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.todoList !== prevProps.todoList) {
      this.setState({ tasks: this.props.todoList });
    }

    if (prevState.loading === true) {
      this.setState({ loading: false });
    }
  }

  handleClick = () => {
    this.setState({ showModal: true });
  };

  handleSort = () => {
    let tasks = _.sortBy(this.state.tasks, [
      function (task) {
        return task.task;
      },
    ]);
    if (this.state.sort) {
      _.reverse(tasks);
    }
    this.setState({ tasks: tasks, sort: !this.state.sort });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      task: "",
      taskError: "",
      showDeleteModal: false,
      deleteTaskId: "",
      taskId: "",
    });
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleSave = () => {
    const taskObject = _.find(this.state.tasks, {
      todoListId: this.state.taskId,
    });
    if (validator.isEmpty(this.state.task)) {
      this.setState({ taskError: "Task cannot be blank" });
    } else if (
      taskObject &&
      validator.equals(this.state.task, taskObject.task)
    ) {
      this.handleClose();
    } else {
      this.handleClose();
      this.setState({ loading: true });
      this.props.saveTask({
        task: this.state.task,
        todoListId: this.state.taskId,
      });
    }
  };

  handleEdit = (task) => {
    this.setState({
      task: task.task,
      showModal: true,
      taskId: task.todoListId,
    });
  };

  handleDelete = (todoTaskId) => {
    this.setState({
      showDeleteModal: true,
      deleteTaskId: todoTaskId,
    });
  };

  handleConfirmDelete = () => {
    this.handleClose();
    this.setState({ loading: true });
    this.props.deleteTask(this.state.deleteTaskId);
  };

  render() {
    let filteredTasks = _.filter(this.state.tasks, (task) => {
      return task.task.toLowerCase().includes(this.state.search.toLowerCase());
    });
    return (
      <>
        <SearchBar
          search={this.state.search}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleSort={this.handleSort}
        />
        <br />
        <TodoList
          filteredTasks={filteredTasks}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
        <CustomDialog
          showModal={this.state.showModal}
          handleClose={this.handleClose}
          handleAction={this.handleSave}
          buttonLabel="SAVE CHANGES"
          title="Create Task"
        >
          <InputField
            label="Task"
            error={Object.keys(this.state.taskError).length ? true : false}
            value={this.state.task}
            onChange={this.handleChange}
            name="task"
            required={true}
            maxLength={250}
            autofocus={true}
            helperText={this.state.taskError}
            multiline={true}
            rows="6"
          />
        </CustomDialog>
        <CustomDialog
          showModal={this.state.showDeleteModal}
          handleClose={this.handleClose}
          handleAction={this.handleConfirmDelete}
          title="Delete Task"
          buttonLabel="DELETE"
        >
          Do you want to delete this task?
        </CustomDialog>
        <CustomBackdrop open={this.state.loading} />
      </>
    );
  }
}

Home.propTypes = {
  getTodoList: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  saveTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { todoList: state.todoList.todoList };
};

export default connect(mapStateToProps, { getTodoList, saveTask, deleteTask })(
  Home
);
