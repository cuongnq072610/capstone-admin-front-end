/*
 *
 * ReportPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_COURSE,
  LOAD_COURSE_FAILURE,
  LOAD_COURSE_SUCCESS,
  LOAD_TEACHER,
  LOAD_FAILURE_TEACHER,
  LOAD_SUCCESS_TEACHER
} from './constants';

export const initialState = fromJS({
  isLoadingCourse: false,
  isLoadingTeaher: false,
  message: "",
  error: "",
  courses: [],
  teachers: [],
});

function reportPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      case LOAD_COURSE:
        return state.set("isLoadingCourse", true);
      case LOAD_COURSE_SUCCESS:
        return state.set("isLoadingCourse", false).set("courses", fromJS(action.payload));
      case LOAD_COURSE_FAILURE:
        return state.set("isLoadingCourse", false).set("errors", action.payload);
      case LOAD_TEACHER:
        return state.set('isLoadingTeaher', true);
      case LOAD_SUCCESS_TEACHER:
        return state.set('teachers', fromJS(action.payload)).set('isLoadingTeaher', false);
      case LOAD_FAILURE_TEACHER:
        return state.set('errors', action.payload).set('isLoadingTeaher', false);
    default:
      return state;
  }
}

export default reportPageReducer;
