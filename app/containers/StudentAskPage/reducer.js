/*
 *
 * StudentAskPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_ASK,
  LOAD_ASK_SUCCESS,
  LOAD_ASK_FAILURE,
  SEARCH_ASK,
  SEARCH_ASK_FAILURE,
  SEARCH_ASK_SUCCESS,
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  asks: [],
  errors: {},
});

function studentAskPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_ASK:
      return state.set("isLoading", true);
    case LOAD_ASK_SUCCESS:
      return state.set("isLoading", false).set("asks", fromJS(action.payload));
    case LOAD_ASK_FAILURE:
      return state.set("isLoading", false).set("errors", fromJS(action.payload));
    case SEARCH_ASK:
      return state.set("isLoading", true);
    case SEARCH_ASK_SUCCESS:
      return state.set("isLoading", false).set("asks", fromJS(action.payload));
    case SEARCH_ASK_FAILURE:
      return state.set("isLoading", false).set("errors", fromJS(action.payload));
    default:
      return state;
  }
}

export default studentAskPageReducer;
