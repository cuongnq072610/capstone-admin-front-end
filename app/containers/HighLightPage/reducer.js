/*
 *
 * HighLightPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_HIGHLIGHT,
  LOAD_HIGHLIGHT_SUCCESS,
  LOAD_HIGHLIGHT_FAILURE,
  LOAD_FOLDER,
  LOAD_FAILURE_FOLDER,
  LOAD_SUCCESS_FOLDER,
  DELETE_HIGHLIGHT,
  DELETE_HIGHLIGHT_FAILURE,
  DELETE_HIGHLIGHT_SUCCESS,
  SEARCH_FAILURE_HIGHLIGHT,
  SEARCH_HIGHLIGHT,
  SEARCH_SUCCESS_HIGHLIGHT
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  highlights: [],
  searchHighlight: [],
  errors: [],
  folders: [],
  isLoadingCourse: false,
  isLoadingDelete: false,
  message: {},
});

function highLightPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_HIGHLIGHT:
      return state.set("isLoading", true);
    case LOAD_HIGHLIGHT_SUCCESS:
      return state.set("isLoading", false).set("highlights", fromJS(action.payload));
    case LOAD_HIGHLIGHT_FAILURE:
      return state.set("isLoading", false).set("errors", action.payload);
    case LOAD_FOLDER:
      return state.set("isLoadingCourse", true);
    case LOAD_SUCCESS_FOLDER:
      return state.set("isLoadingCourse", false).set('folders', fromJS(action.payload));
    case LOAD_FAILURE_FOLDER:
      return state.set("isLoadingCourse", false).set("error", action.payload);
    case DELETE_HIGHLIGHT:
      return state.set("isLoadingDelete", true);
    case DELETE_HIGHLIGHT_SUCCESS:
      return state.set("isLoadingDelete", false).set("message", action.payload);
    case DELETE_HIGHLIGHT_FAILURE:
      return state.set("isLoadingDelete", false).set("error", action.payload);
    case SEARCH_HIGHLIGHT:
      return state.set('isLoading', true);
    case SEARCH_SUCCESS_HIGHLIGHT:
      return state.set('searchHighlight', fromJS(action.payload)).set('isLoading', false);
    case SEARCH_FAILURE_HIGHLIGHT:
      return state.set('errors', action.payload).set('isLoading', false);
    default:
      return state;
  }
}

export default highLightPageReducer;
