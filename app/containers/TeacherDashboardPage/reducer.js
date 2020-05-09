/*
 *
 * TeacherDashboardPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_TEACHER_STATISTIC,
  GET_TEACHER_STATISTIC_FAILURE,
  GET_TEACHER_STATISTIC_SUCCESS,
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  statistic: {},
  error: "",
});

function teacherDashboardPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_TEACHER_STATISTIC:
      return state.set("isLoading", true);
    case GET_TEACHER_STATISTIC_SUCCESS:
      return state.set('isLoading', false).set("statistic", fromJS(action.payload));
    case GET_TEACHER_STATISTIC_FAILURE:
      return state.set('isLoading', false).set('error', action.payload);
    default:
      return state;
  }
}

export default teacherDashboardPageReducer;
