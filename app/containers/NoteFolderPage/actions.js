/*
 *
 * NoteFolderPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_NOTES_BY_FOLDER, DELETE_NOTE, SEARCH_NOTE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadNotesByFolder(courseId) {
  return {
    type: LOAD_NOTES_BY_FOLDER,
    courseId,
  };
}

export function loadDeleteNote(id) {
  return {
    type: DELETE_NOTE,
    id,
  }
}

export function searchNote(key) {
  return {
    type: SEARCH_NOTE,
    key,
  }
}