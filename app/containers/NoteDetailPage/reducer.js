/*
 *
 * NoteDetailPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_NOTE, LOAD_NOTE_SUCCESS, LOAD_NOTE_FAILURE } from './constants';

export const initialState = fromJS({
  isLoading: false,
  note: {},
  error: {},
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
    default:
      return state;
  }
}

export default noteDetailPageReducer;
