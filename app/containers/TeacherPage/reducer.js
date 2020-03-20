/*
 *
 * TeacherPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_TEACHER,
  LOAD_SUCCESS_TEACHER,
  LOAD_FAILURE_TEACHER,
  SEARCH_TEACHER,
  SEARCH_SUCCESS_TEACHER,
  SEARCH_FAILURE_TEACHER,
  UPDATE_FAILURE_TEACHER,
  UPDATE_SUCCESS_TEACHER,
  UPDATE_TEACHER,
  LOAD_SUCCESS_DEPARTMENT,
  LOAD_DEPARTMENT,
  LOAD_FAILURE_DEPARTMENT
} from './constants';

export const initialState = fromJS({
  teachers: [],
  departments: [],
  isLoadingDepartment: false,
  isLoading: false,
  errors: '',
  message: ""
});

function teacherPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_TEACHER:
      return state.set('isLoading', true);
    case LOAD_SUCCESS_TEACHER:
      return state.set('teachers', fromJS(action.payload)).set('isLoading', false);
    case LOAD_FAILURE_TEACHER:
      return state.set('errors', action.payload).set('isLoading', false);
    case SEARCH_TEACHER:
      return state.set('isLoading', true);
    case SEARCH_SUCCESS_TEACHER:
      return state.set('teachers', fromJS(action.payload)).set('isLoading', false);
    case SEARCH_FAILURE_TEACHER:
      return state.set('errors', action.payload).set('isLoading', false);
    case UPDATE_TEACHER:
      return state;
    case UPDATE_SUCCESS_TEACHER:
      return state.set('message', fromJS(action.payload)).set("teachers", action.payloadTeachers);
    case UPDATE_FAILURE_TEACHER:
      return state.set('errors', action.payload);
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

export default teacherPageReducer;
