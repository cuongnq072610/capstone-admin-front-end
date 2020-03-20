/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';

export const initialState = fromJS({
  isLoading: false,
  token: {},
  error: {}
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN:
      return state.set("isLoading", true).set("error", {}).set("token", {});
    case LOGIN_SUCCESS:
      return state.set("isLoading", false).set("token", fromJS(action.payload));
    case LOGIN_FAILURE:
      return state.set("isLoading", false).set("error", fromJS(action.payload));
    default:
      return state;
  }
}

export default loginPageReducer;
