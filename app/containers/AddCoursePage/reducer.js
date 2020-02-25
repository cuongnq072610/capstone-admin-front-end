/*
 *
 * AddCoursePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, ADD_COURSE, ADD_COURSE_SUCCESS, ADD_COURSE_FAILURE, UPDATE_COURSE, UPDATE_COURSE_SUCCESS, UPDATE_COURSE_FAILURE } from './constants';

export const initialState = fromJS({
  error: "",
  isLoading: false,
  message: "",
});

function addCoursePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_COURSE:
      return state.set('isLoading', true);
    case ADD_COURSE_SUCCESS:
      return state.set('isLoading', false).set("message", action.payload);
    case ADD_COURSE_FAILURE:
      return state.set('isLoading', false).set("error", action.payload);
    case UPDATE_COURSE:
      return state.set('isLoading', true);
    case UPDATE_COURSE_SUCCESS:
      return state.set('isLoading', false).set("message", action.payload);
    case UPDATE_COURSE_FAILURE:
      return state.set('isLoading', false).set("error", action.payload);
    default:
      return state;
  }
}

export default addCoursePageReducer;
