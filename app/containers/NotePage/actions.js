/*
 *
 * NotePage actions
 *
 */

import { DEFAULT_ACTION, LOAD_NOTE, DELETE_NOTE, LOAD_FOLDER, SEARCH_NOTE } from './constants';

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

export function loadStudentCourses(id) {
  return {
    type: LOAD_FOLDER,
    id
  }
}

export function searchNote(key) {
  return {
    type: SEARCH_NOTE,
    key,
  }
}