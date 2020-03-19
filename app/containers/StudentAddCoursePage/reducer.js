/*
 *
 * StudentAddCoursePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_COURSE, LOAD_SUCCESS_COURSE, LOAD_FAILURE_COURSE, SEARCH_COURSE, SEARCH_SUCCESS_COURSE, SEARCH_FAILURE_COURSE } from './constants';

export const initialState = fromJS({
  courses: [],
  isLoading: false,
  errors: {},
});

function studentAddCoursePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_COURSE:
      return state.set('isLoading', true);
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
    default:
      return state;
  }
}

export default studentAddCoursePageReducer;
