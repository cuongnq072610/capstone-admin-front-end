/*
 *
 * NotePage actions
 *
 */

import { DEFAULT_ACTION, LOAD_NOTE, DELETE_NOTE, LOAD_COURSE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadNote(body) {
  return {
    type: LOAD_NOTE,
    body,
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
    type: LOAD_COURSE,
    id
  }
}