/*
 *
 * NoteFolderPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_NOTES_BY_FOLDER,
  LOAD_NOTES_BY_FOLDER_SUCCESS,
  LOAD_NOTES_BY_FOLDER_FAILURE,
  DELETE_NOTE,
  DELETE_NOTE_FAILURE,
  DELETE_NOTE_SUCCESS,
  SEARCH_NOTE,
  SEARCH_FAILURE_NOTE,
  SEARCH_SUCCESS_NOTE,
  DELETE_FAILURE_FOLDER,
  DELETE_FOLDER,
  DELETE_SUCCESS_FOLDER,
  DELETE_FAILURE_NOTE_BY_FOLDER,
  DELETE_NOTE_BY_FOLDER,
  DELETE_SUCCESS_NOTE_BY_FOLDER
} from './constants';

export const initialState = fromJS({
  notes: [],
  isLoading: false,
  error: {},
  isLoadingDelete: false,
  isLoadingDeleteFolder: false,
  message: {},
  searchNotes: [],
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
    case DELETE_NOTE:
      return state.set("isLoadingDelete", true);
    case DELETE_NOTE_SUCCESS:
      return state.set("isLoadingDelete", false).set("message", action.payload);
    case DELETE_NOTE_FAILURE:
      return state.set("isLoadingDelete", false).set("error", action.payload);
    case SEARCH_NOTE:
      return state.set('isLoading', true);
    case SEARCH_SUCCESS_NOTE:
      return state.set('searchNotes', fromJS(action.payload)).set('isLoading', false);
    case SEARCH_FAILURE_NOTE:
      return state.set('errors', action.payload).set('isLoading', false);
    case DELETE_FOLDER:
      return state.set("isLoadingDeleteFolder", true);
    case DELETE_SUCCESS_FOLDER:
      return state.set("isLoadingDeleteFolder", false).set("message", action.payload);
    case DELETE_FAILURE_FOLDER:
      return state.set("isLoadingDeleteFolder", false).set("error", action.payload);
    case DELETE_NOTE_BY_FOLDER:
      return state.set("isLoadingDelete", true);
    case DELETE_SUCCESS_NOTE_BY_FOLDER:
      return state.set("isLoadingDelete", false).set("message", action.payload);
    case DELETE_FAILURE_NOTE_BY_FOLDER:
      return state.set("isLoadingDelete", false).set("error", action.payload);
    default:
      return state;
  }
}

export default noteFolderPageReducer;
