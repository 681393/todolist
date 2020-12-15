import { combineReducers } from "redux";
import {
  GET_TODO_LIST,
  SAVE_TASK,
  DELETE_TASK,
  SET_CURRENT_USER,
  LOGIN_ERROR,
  SIGNUP_ERROR,
} from "../api/types";
import _ from "lodash";

const initialState = {
  validToken: false,
  user: "",
};

const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

const security = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};

const todoList = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return { ...state, loginError: action.payload };
    case SIGNUP_ERROR:
      return { ...state, signupError: action.payload };
    case GET_TODO_LIST:
      return { ...state, todoList: action.payload };
    case SAVE_TASK:
      let todoList = _.filter(
        state.todoList,
        (value) => value.todoListId !== action.payload.todoListId
      );
      return { ...state, todoList: [...todoList, action.payload] };
    case DELETE_TASK:
      return {
        ...state,
        todoList: state.todoList.filter(
          (data) => data.todoListId !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default combineReducers({
  security,
  todoList,
});
