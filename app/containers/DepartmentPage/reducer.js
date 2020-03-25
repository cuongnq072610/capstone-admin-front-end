/*
 *
 * DepartmentPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_DEPARTMENT,
  LOAD_SUCCESS_DEPARTMENT,
  LOAD_FAILURE_DEPARTMENT,
  LOAD_CREATE_DEPARTMENT,
  LOAD_CREATE_FAILURE_DEPARTMENT,
  LOAD_CREATE_SUCCESS_DEPARTMENT,
  LOAD_DELETE_DEPARTMENT,
  LOAD_DELETE_SUCCESS_DEPARTMENT,
  LOAD_DELETE_FAILURE_DEPARTMENT,
  LOAD_UPDATE_DEPARTMENT,
  LOAD_UPDATE_FAILURE_DEPARTMENT,
  LOAD_UPDATE_SUCCESS_DEPARTMENT
} from './constants';

export const initialState = fromJS({
  departments: [],
  isLoadingDepartment: false,
  errors: "",
  isLoadingCreate: false,
  isLoadingDelete: false,
  isLoadingUpdate: false,
  message: "",
});

function departmentPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_DEPARTMENT:
      return state.set('isLoadingDepartment', true);
    case LOAD_SUCCESS_DEPARTMENT:
      return state.set('departments', fromJS(action.payload)).set('isLoadingDepartment', false);
    case LOAD_FAILURE_DEPARTMENT:
      return state.set('errors', action.payload).set('isLoadingDepartment', false);
    case LOAD_DELETE_DEPARTMENT:
      return state.set('isLoadingDelete', true);
    case LOAD_DELETE_SUCCESS_DEPARTMENT:
      return state.set('message', fromJS(action.payload)).set('isLoadingDelete', false);
    case LOAD_DELETE_FAILURE_DEPARTMENT:
      return state.set('errors', action.payload).set('isLoadingDelete', false);
    case LOAD_CREATE_DEPARTMENT:
      return state.set("isLoadingCreate", true);
    case LOAD_CREATE_SUCCESS_DEPARTMENT:
      return state.set("isLoadingCreate", false).set('message', fromJS(action.payload));
    case LOAD_CREATE_FAILURE_DEPARTMENT:
      return state.set("isLoadingCreate", false).set('errors', action.payload);
    case LOAD_UPDATE_DEPARTMENT:
      return state.set("isLoadingUpdate", true);
    case LOAD_UPDATE_SUCCESS_DEPARTMENT:
      return state.set("isLoadingUpdate", false).set('message', fromJS(action.payload));
    case LOAD_UPDATE_FAILURE_DEPARTMENT:
      return state.set("isLoadingUpdate", false).set('errors', action.payload);
    default:
      return state;
  }
}

export default departmentPageReducer;
