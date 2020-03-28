/*
 *
 * DashboardPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_ADMIN_STATISTIC, LOAD_ADMIN_STATISTIC_FAILURE, LOAD_ADMIN_STATISTIC_SUCCESS } from './constants';

export const initialState = fromJS({
  isLoadingStatistic: false,
  errors: "",
  statistic: {},
});

function dashboardPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_ADMIN_STATISTIC:
      return state.set("isLoadingStatistic", true);
    case LOAD_ADMIN_STATISTIC_SUCCESS:
      return state.set("isLoadingStatistic", false).set("statistic", action.payload);
    case LOAD_ADMIN_STATISTIC_FAILURE:
      return state.set("isLoadingStatistic", false).set("errors", action.payload);
    default:
      return state;
  }
}

export default dashboardPageReducer;
