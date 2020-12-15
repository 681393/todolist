import axios from "axios";

import history from "../api/history";
import { GET_TODO_LIST, SAVE_TASK, DELETE_TASK } from "../api/types";
import { accessDenied } from "../security/accessDenied";

export const getTodoList = () => async (dispatch, getState) => {
  const { security } = getState();
  if (security.user && security.validToken) {
    try {
      const response = await axios.get(`/api/todoList/${security.user.sub}`);
      dispatch({
        type: GET_TODO_LIST,
        payload: response.data,
      });
    } catch (err) {
      accessDenied(err.response.status, dispatch);
    }
  } else {
    history.push("/");
  }
};

export const saveTask = (task) => async (dispatch, getState) => {
  const { security } = getState();
  if (security.user && security.validToken) {
    try {
      const response = await axios.post(`/api/todoList/${security.user.sub}`, task);
      dispatch({
        type: SAVE_TASK,
        payload: response.data,
      });
    } catch (err) {
      accessDenied(err.response.status, dispatch);
    }
  } else {
    history.push("/");
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`/api/todoList/${taskId}`);
    dispatch({
      type: DELETE_TASK,
      payload: taskId,
    });
  } catch (err) {
    accessDenied(err.response.status, dispatch);
  }
};
