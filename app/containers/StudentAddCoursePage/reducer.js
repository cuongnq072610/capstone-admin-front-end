/*
 *
 * StudentAddCoursePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_COURSE,
  LOAD_SUCCESS_COURSE,
  LOAD_FAILURE_COURSE,
  SEARCH_COURSE,
  SEARCH_SUCCESS_COURSE,
  SEARCH_FAILURE_COURSE,
  UPDATE_COURSE,
  UPDATE_FAILURE_COURSE,
  UPDATE_SUCCESS_COURSE,
} from './constants';

export const initialState = fromJS({
  courses: [],
  isLoading: false,
  isLoadingUpdate: false,
  errors: {},
  msg_success: "",
  msg_fail: "",
});

function studentAddCoursePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_COURSE:
      return state.set('isLoading', true).set("msg_success", "").set("msg_fail", "");
    case LOAD_SUCCESS_COURSE:
      return state.set('courses', fromJS(action.payload)).set('isLoading', false);
    case LOAD_FAILURE_COURSE:
      return state.set('errors', action.payload).set('isLoading', false);
    case SEARCH_COURSE:
      return state.set('isLoading', true);
    case SEARCH_SUCCESS_COURSE:
      return state.set('courses', fromJS(action.payload)).set('isLoading', false);
    case SEARCH_FAILURE_COURSE:
      return state.set('errors', action.payload).set('isLoading', false);
    case UPDATE_COURSE:
      return state.set("isLoadingUpdate", true);
    case UPDATE_SUCCESS_COURSE:
      return state.set("isLoadingUpdate", false).set("msg_success",action.payload);
    case UPDATE_FAILURE_COURSE:
      return state.set("isLoadingUpdate", false).set("msg_fail", action.payload);
    default:
      return state;
  }
}

export default studentAddCoursePageReducer;
