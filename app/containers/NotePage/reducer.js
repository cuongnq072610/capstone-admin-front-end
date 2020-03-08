/*
 *
 * NotePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_SUCCESS_FOLDER, LOAD_FOLDER, LOAD_NOTE, LOAD_SUCCESS_NOTE, LOAD_FAILURE_NOTE, LOAD_FAILURE_FOLDER, CREATE_FOLDER, CREATE_SUCCESS_FOLDER, CREATE_FAILURE_FOLDER } from './constants';

export const initialState = fromJS({
  notes: [],
  folders: [],
  isLoadingNote: false,
  isLoadingFolder: false,
  isCreatingFolder: false,
  errors: "",
  message: {},
});

function notePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_NOTE:
      return state.set('isLoadingNote', true);
    case LOAD_SUCCESS_NOTE:
      return state.set('notes', fromJS(action.payload)).set("isLoadingNote", false);
    case LOAD_FAILURE_NOTE:
      return state.set('errors', action.payload).set("isLoadingNote", false);
    case LOAD_FOLDER:
      return state.set('isLoadingFolder', true);
    case LOAD_SUCCESS_FOLDER:
      return state.set('folders', fromJS(action.payload)).set("isLoadingFolder", false);
    case LOAD_FAILURE_FOLDER:
      return state.set('errors', action.payload).set("isLoadingFolder", false);
    case CREATE_FOLDER:
      return state.set("isCreatingFolder", true).set("message", {}).set("errors", {});
    case CREATE_SUCCESS_FOLDER:
      return state.set("isCreatingFolder", false).set("message", action.payload);
    case CREATE_FAILURE_FOLDER:
      return state.set("isCreatingFolder", false).set("message", action.payload);
    default:
      return state;
  }
}

export default notePageReducer;
