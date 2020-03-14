/*
 *
 * NotePage actions
 *
 */

import { DEFAULT_ACTION, LOAD_NOTE, LOAD_FOLDER, CREATE_FOLDER, DELETE_NOTE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadNote() {
  return {
    type: LOAD_NOTE,
  }
}

export function loadDeleteNote(id) {
  return {
    type: DELETE_NOTE,
    id,
  }
}