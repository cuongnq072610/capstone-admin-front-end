/*
 *
 * AddCoursePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ADD_COURSE,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  UPDATE_COURSE,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAILURE,
  LOAD_DEPARTMENT,
  LOAD_SUCCESS_DEPARTMENT,
  LOAD_FAILURE_DEPARTMENT
} from './constants';

export const initialState = fromJS({
  errors: "",
  isLoading: false,
  message: "",
  isDone: false,
  departments: [],
  isLoadingDepartment: false,
});

function addCoursePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_COURSE:
      return state.set('isLoading', true).set("isDone", false).set("errors", "");
    case ADD_COURSE_SUCCESS:
      return state.set('isLoading', false).set("message", action.payload).set("isDone", true);
    case ADD_COURSE_FAILURE:
      return state.set('isLoading', false).set("errors", action.payload).set("isDone", false);
    case UPDATE_COURSE:
      return state.set('isLoading', true).set("isDone", false).set("errors", "");
    case UPDATE_COURSE_SUCCESS:
      return state.set('isLoading', false).set("message", action.payload).set("isDone", true);
    case UPDATE_COURSE_FAILURE:
      return state.set('isLoading', false).set("errors", action.payload).set("isDone", false);
    case LOAD_DEPARTMENT:
      return state.set('isLoadingDepartment', true);
    case LOAD_SUCCESS_DEPARTMENT:
      return state.set('departments', fromJS(action.payload)).set('isLoadingDepartment', false);
    case LOAD_FAILURE_DEPARTMENT:
      return state.set('errors', action.payload).set('isLoadingDepartment', false);
    default:
      return state;
  }
}

export default addCoursePageReducer;
