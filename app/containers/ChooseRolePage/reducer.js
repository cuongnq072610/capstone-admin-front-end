/*
 *
 * ChooseRolePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, CHOOSE_ROLE, CHOOSE_ROLE_FAILURE, CHOOSE_ROLE_SUCCESS } from './constants';

export const initialState = fromJS({
  isLoading: false,
  error: "",
  url: "",
});

function chooseRolePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHOOSE_ROLE:
      return state.set("isLoading", true);
    case CHOOSE_ROLE_FAILURE:
      return state.set("isLoading", false).set("error", action.payload);
    case CHOOSE_ROLE_SUCCESS:
      return state.set("isLoading", false).set("url", action.payload);
    default:
      return state;
  }
}

export default chooseRolePageReducer;
