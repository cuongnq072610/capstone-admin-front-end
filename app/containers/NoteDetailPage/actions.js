/*
 *
 * NoteDetailPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_NOTE, UPDATE_NOTE, DELETE_NOTE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadNoteDetail(id) {
  return {
    type: LOAD_NOTE, 
    id,
  }
}

export function loadSaveNote(note, id) {
  return {
    type: UPDATE_NOTE,
    note,
    id,
  }
}

export function loadDeleteNote(id) {
  return {
    type: DELETE_NOTE,
    id,
  }
}