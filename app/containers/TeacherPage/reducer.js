/*
 *
 * TeacherPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_TEACHER, LOAD_SUCCESS_TEACHER, LOAD_FAILURE_TEACHER, SEARCH_TEACHER, SEARCH_SUCCESS_TEACHER, SEARCH_FAILURE_TEACHER } from './constants';

export const initialState = fromJS({
  teachers: [],
  isLoading: false,
  errors: ''
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
    default:
      return state;
  }
}

export default teacherPageReducer;
