/*
 *
 * NoteFolderPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_NOTES_BY_FOLDER, DELETE_NOTE, SEARCH_NOTE, DELETE_FOLDER } from './constants';

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

export function searchNote(key, id) {
  return {
    type: SEARCH_NOTE,
    key,
    id,
  }
}

export function loadDeleteFolder(id) {
  return {
    type: DELETE_FOLDER,
    id,
  }
}