/*
 *
 * StudentDashboardPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_STUDENT_INFO, LOAD_STUDENT_INFO_SUCCESS, LOAD_STUDENT_INFO_FAILURE } from './constants';

export const initialState = fromJS({
  user: {},
  isLoading: false,
  errors: {},
});

function studentDashboardPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_STUDENT_INFO:
      return state.set("isLoading", true);
    case LOAD_STUDENT_INFO_SUCCESS:
      return state.set("isLoading", false).set("user", fromJS(action.payload));
    case LOAD_STUDENT_INFO_FAILURE:
      return state.set("isLoading", false).set("errors", action.payload);
    default:
      return state;
  }
}

export default studentDashboardPageReducer;
