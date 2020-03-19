/*
 *
 * NoteFolderPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_NOTES_BY_FOLDER, LOAD_NOTES_BY_FOLDER_SUCCESS, LOAD_NOTES_BY_FOLDER_FAILURE } from './constants';

export const initialState = fromJS({
  notes: [],
  isLoading: false,
  error: {},
});

function noteFolderPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_NOTES_BY_FOLDER:
      return state.set("isLoading", true);
    case LOAD_NOTES_BY_FOLDER_SUCCESS:
      return state.set("isLoading", false).set("notes", fromJS(action.payload));
    case LOAD_NOTES_BY_FOLDER_FAILURE:
      return state.set("isLoading", false).set("error", action.payload);
    default:
      return state;
  }
}

export default noteFolderPageReducer;
