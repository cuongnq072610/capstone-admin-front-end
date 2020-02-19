/*
 *
 * NotePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_SUCCESS_FOLDER, LOAD_FOLDER, LOAD_NOTE, LOAD_SUCCESS_NOTE, LOAD_FAILURE_NOTE, LOAD_FAILURE_FOLDER } from './constants';

export const initialState = fromJS({
  notes: [],
  folder: [],
  isLoadingNote: false,
  isLoadingFolder: false,
  errors: "",
});

function notePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_FOLDER:
      return state.set('isLoadingNote', true);
    case LOAD_NOTE:
      return state.set('isLoadingFolder', true);
    case LOAD_SUCCESS_NOTE:
      return state.set('notes', fromJS(action.payload));
    case LOAD_FAILURE_NOTE:
      return state.set('errors', action.payload);
    case LOAD_SUCCESS_FOLDER:
      return state.set('folders', fromJS(action.payload));
    case LOAD_FAILURE_FOLDER:
      return state.set('errors', action.payload);
    default:
      return state;
  }
}

export default notePageReducer;
