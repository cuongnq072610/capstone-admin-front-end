/*
 *
 * FaqPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_FAQ,
  LOAD_FAQ_FAILURE,
  LOAD_FAQ_SUCCESS,
  SEARCH_FAQ,
  SEARCH_FAQ_FAILURE,
  SEARCH_FAQ_SUCCESS
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  faq: [],
  error: "",
  totalPage: "",
});

function faqPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_FAQ:
      return state.set("isLoading", true);
    case LOAD_FAQ_SUCCESS:
      return state.set("isLoading", false).set("faq", fromJS(action.payload)).set("totalPage", action.number);
    case LOAD_FAQ_FAILURE:
      return state.set("isLoading", false).set("error", action.payload);
    case SEARCH_FAQ:
      return state.set("isLoading", true);
    case SEARCH_FAQ_SUCCESS:
      return state.set("isLoading", false).set("faq", fromJS(action.payload)).set("totalPage", action.number);
    case SEARCH_FAQ_FAILURE:
      return state.set("isLoading", false).set("error", action.payload);
    default:
      return state;
  }
}

export default faqPageReducer;
