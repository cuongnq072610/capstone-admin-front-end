/*
 *
 * StudentCreateAskPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CREATE_ASK,
  CREATE_ASK_SUCCESS,
  CREATE_ASK_FAILURE,
  LOAD_STUDENT_INFO,
  LOAD_STUDENT_INFO_FAILURE,
  LOAD_STUDENT_INFO_SUCCESS,
  LOAD_FAILURE_TEACHER,
  LOAD_SUCCESS_TEACHER,
  LOAD_TEACHER,
} from './constants';

export const initialState = fromJS({
  isLoadingCreate: false,
  isLoadingCourse: false,
  isLoadingTeaher: false,
  message: "",
  error: "",
  courses: [],
  teachers: [],
});

function studentCreateAskPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CREATE_ASK:
      return state.set("isLoadingCreate", true);
    case CREATE_ASK_SUCCESS:
      return state.set("isLoadingCreate", false).set("message", action.payload);
    case CREATE_ASK_FAILURE:
      return state.set("isLoadingCreate", false).set("error", action.payload);
    case LOAD_STUDENT_INFO:
      return state.set("isLoadingCourse", true);
    case LOAD_STUDENT_INFO_SUCCESS:
      return state.set("isLoadingCourse", false).set("courses", fromJS(action.payload));
    case LOAD_STUDENT_INFO_FAILURE:
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

export default studentCreateAskPageReducer;
