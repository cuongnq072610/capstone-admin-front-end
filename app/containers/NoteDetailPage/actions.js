/*
 *
 * NoteDetailPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_NOTE } from './constants';

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