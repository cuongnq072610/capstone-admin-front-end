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
  PIN_FAQ,
  PIN_FAQ_FAILURE,
  PIN_FAQ_SUCCESS,
  DELETE_FAQ,
  DELETE_FAQ_FAILURE,
  DELETE_FAQ_SUCCESS,
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  isLoadingClose: false,
  ask: {},
  errors: {},
  messageRes: "",
  isLoadingPin: false,
  isLoadingDelete: false,
});

function studentComposePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_ASK_DETAIL:
      return state.set("isLoading", true);
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
    case PIN_FAQ:
      return state.set("isLoadingPin", true);
    case PIN_FAQ_SUCCESS:
      return state.set("isLoadingPin", false).set("messageRes", action.payload);
    case PIN_FAQ_FAILURE:
      return state.set("isLoadingPin", false).set("errors", fromJS(action.payload));
    case DELETE_FAQ:
      return state.set("isLoadingDelete", true).set("messageRes", "");
    case DELETE_FAQ_SUCCESS:
      return state.set("isLoadingDelete", false).set("messageRes", fromJS(action.payload))
    case DELETE_FAQ_FAILURE:
      return state.set("isLoadingDelete", false).set("error", action.payload);
    default:
      return state;
  }
}

export default studentComposePageReducer;
