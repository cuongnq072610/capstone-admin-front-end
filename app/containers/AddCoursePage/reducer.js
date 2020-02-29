/*
 *
 * AddCoursePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, ADD_COURSE, ADD_COURSE_SUCCESS, ADD_COURSE_FAILURE, UPDATE_COURSE, UPDATE_COURSE_SUCCESS, UPDATE_COURSE_FAILURE } from './constants';

export const initialState = fromJS({
  errors: {},
  isLoading: false,
  message: "",
  isDone: false,
});

function addCoursePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_COURSE:
      return state.set('isLoading', true).set("isDone", false);
    case ADD_COURSE_SUCCESS:
      return state.set('isLoading', false).set("message", action.payload).set("isDone", true);
    case ADD_COURSE_FAILURE:
      return state.set('isLoading', false).set("errors", action.payload).set("isDone", false);
    case UPDATE_COURSE:
      return state.set('isLoading', true).set("isDone", false);
    case UPDATE_COURSE_SUCCESS:
      return state.set('isLoading', false).set("message", action.payload).set("isDone", true);
    case UPDATE_COURSE_FAILURE:
      return state.set('isLoading', false).set("errors", action.payload).set("isDone", false);
    default:
      return state;
  }
}

export default addCoursePageReducer;
