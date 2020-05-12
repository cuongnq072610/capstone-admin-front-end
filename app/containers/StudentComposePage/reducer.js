/*
 *
 * StudentComposePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_ASK_DETAIL,
  LOAD_ASK_DETAIL_SUCCESS,
  LOAD_ASK_DETAIL_FAILURE,
  CLOSE_ASK_DETAIL,
  CLOSE_ASK_DETAIL_FAILURE,
  CLOSE_ASK_DETAIL_SUCCESS,
  REOPEN_ASK_DETAIL,
  REOPEN_ASK_DETAIL_FAILURE,
  REOPEN_ASK_DETAIL_SUCCESS
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  isLoadingClose: false,
  isLoadingOpen: false,
  ask: {},
  errors: "",
  messageRes: ""
});

function studentComposePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_ASK_DETAIL:
      return state.set("isLoading", true).set("errors", "");
    case LOAD_ASK_DETAIL_SUCCESS:
      return state.set("isLoading", false).set("ask", fromJS(action.payload));
    case LOAD_ASK_DETAIL_FAILURE:
      return state.set("isLoading", false).set("errors", fromJS(action.payload));
    case CLOSE_ASK_DETAIL:
      return state.set("isLoadingClose", true);
    case CLOSE_ASK_DETAIL_SUCCESS:
      return state.set("isLoadingClose", false).set("messageRes", action.payload);
    case CLOSE_ASK_DETAIL_FAILURE:
      return state.set("isLoadingClose", false).set("errors", fromJS(action.payload));
    case REOPEN_ASK_DETAIL:
      return state.set("isLoadingOpen", true);
    case REOPEN_ASK_DETAIL_SUCCESS:
      return state.set("isLoadingOpen", false).set("messageRes", action.payload);
    case REOPEN_ASK_DETAIL_FAILURE:
      return state.set("isLoadingOpen", false).set("errors", fromJS(action.payload));
    default:
      return state;
  }
}

export default studentComposePageReducer;
