/*
 *
 * NoteDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_NOTE, LOAD_NOTE_SUCCESS, LOAD_NOTE_FAILURE, UPDATE_NOTE, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_FAILURE, DELETE_NOTE, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAILURE } from './constants';

export const initialState = fromJS({
  isLoading: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  note: {},
  error: "",
  message: "",
});

function noteDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_NOTE:
      return state.set("isLoading", true);
    case LOAD_NOTE_SUCCESS:
      return state.set("isLoading", false).set("note", fromJS(action.payload));
    case LOAD_NOTE_FAILURE:
      return state.set("isLoading", false).set("error", action.payload);
    case UPDATE_NOTE:
      return state.set("isLoadingUpdate", true).set("error", "").set("message", "");
    case UPDATE_NOTE_SUCCESS:
      return state.set("isLoadingUpdate", false).set("message", action.payload).set("note", fromJS(action.note));
    case UPDATE_NOTE_FAILURE:
      return state.set("isLoadingUpdate", false).set("error", action.payload);
    case DELETE_NOTE:
      return state.set("isLoadingDelete", true).set("error", "").set("message", "");
    case DELETE_NOTE_SUCCESS:
      return state.set("isLoadingDelete", false).set("message", action.payload);
    case DELETE_NOTE_FAILURE:
      return state.set("isLoadingDelete", false).set("error", action.payload);
    default:
      return state;
  }
}

export default noteDetailPageReducer;
