/*
 *
 * AddTeacherPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_TEACHER, SEARCH_TEACHER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadTeacher() {
  return {
    type: LOAD_TEACHER,
  };
}

export function searchTeacher(key) {
  return {
    type: SEARCH_TEACHER,
    key,
  }
}