/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_COURSE, LOAD_FAILURE_COURSE, LOAD_SUCCESS_COURSE } from './constants';

export const initialState = fromJS({
  courses: [],
  isLoading: false,
  errors: ''
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_COURSE: 
      return state.set('isLoading', true);
    case LOAD_SUCCESS_COURSE:
      return state.set('courses', fromJS(action.payload));
    case LOAD_FAILURE_COURSE: 
      return state.set('errors', action.payload);
    default:
      return state;
  }
}

export default homePageReducer;
