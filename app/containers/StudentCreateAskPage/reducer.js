/*
 *
 * StudentCreateAskPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, CREATE_ASK, CREATE_ASK_SUCCESS, CREATE_ASK_FAILURE } from './constants';

export const initialState = fromJS({
  isLoadingCreate: false,
  message: "",
  error: ""
});

function studentCreateAskPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CREATE_ASK:
      return state.set("isLoadingCreate", true);
    case CREATE_ASK_SUCCESS:
      return state.set("isLoadingCreate", false).set("message", ation.payload);
    case CREATE_ASK_FAILURE:
      return state.set("isLoadingCreate", false).set("error", ation.payload);
    default:
      return state;
  }
}

export default studentCreateAskPageReducer;
