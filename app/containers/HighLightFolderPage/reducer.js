/*
 *
 * HighLightFolderPage reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  DEFAULT_ACTION, 
  LOAD__HIGHLIGHT_BY_FOLDER, 
  LOAD__HIGHLIGHT_BY_FOLDER_SUCCESS, 
  LOAD__HIGHLIGHT_BY_FOLDER_FAILURE, 
  DELETE_HIGHLIGHT, 
  DELETE_HIGHLIGHT_SUCCESS,
  DELETE_HIGHLIGHT_FAILURE
} from './constants';

export const initialState = fromJS({
  highlights: [],
  isLoading: false,
  error: {},
  isLoadingDelete: false,
  message: {},
});

function highLightFolderPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD__HIGHLIGHT_BY_FOLDER:
      return state.set("isLoading", true);
    case LOAD__HIGHLIGHT_BY_FOLDER_SUCCESS:
      return state.set("isLoading", false).set("highlights", fromJS(action.payload));
    case LOAD__HIGHLIGHT_BY_FOLDER_FAILURE:
      return state.set("isLoading", false).set("error", action.payload);
    case DELETE_HIGHLIGHT:
      return state.set("isLoadingDelete", true);
    case DELETE_HIGHLIGHT_SUCCESS:
      return state.set("isLoadingDelete", false).set("message", action.payload);
    case DELETE_HIGHLIGHT_FAILURE:
      return state.set("isLoadingDelete", false).set("error", action.payload);
    default:
      return state;
  }
}

export default highLightFolderPageReducer;
