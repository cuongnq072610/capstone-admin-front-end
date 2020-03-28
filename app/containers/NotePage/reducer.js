/*
 *
 * NotePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_NOTE,
  LOAD_SUCCESS_NOTE,
  LOAD_FAILURE_NOTE,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  LOAD_FOLDER,
  LOAD_FAILURE_FOLDER,
  LOAD_SUCCESS_FOLDER,
  SEARCH_FAILURE_NOTE,
  SEARCH_NOTE,
  SEARCH_SUCCESS_NOTE
} from './constants';

export const initialState = fromJS({
  notes: [],
  isLoadingNote: false,
  isLoadingCourse: false,
  isLoadingDelete: false,
  errors: "",
  message: {},
  folders: [],
  searchingNotes: [],
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
    case DELETE_NOTE:
      return state.set("isLoadingDelete", true);
    case DELETE_NOTE_SUCCESS:
      return state.set("isLoadingDelete", false).set("message", action.payload);
    case DELETE_NOTE_FAILURE:
      return state.set("isLoadingDelete", false).set("error", action.payload);
    case LOAD_FOLDER:
      return state.set("isLoadingCourse", true);
    case LOAD_SUCCESS_FOLDER:
      return state.set("isLoadingCourse", false).set('folders', fromJS(action.payload));
    case LOAD_FAILURE_FOLDER:
      return state.set("isLoadingCourse", false).set("error", action.payload);
    case SEARCH_NOTE:
      return state.set('isLoadingNote', true);
    case SEARCH_SUCCESS_NOTE:
      return state.set('searchingNotes', fromJS(action.payload)).set('isLoadingNote', false);
    case SEARCH_FAILURE_NOTE:
      return state.set('errors', action.payload).set('isLoadingNote', false);
    default:
      return state;
  }
}

export default notePageReducer;
