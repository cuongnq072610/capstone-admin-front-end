/*
 *
 * StudentAddCoursePage actions
 *
 */

import { DEFAULT_ACTION, LOAD_COURSE, SEARCH_COURSE, UPDATE_COURSE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadCourse() {
  return {
    type: LOAD_COURSE,
  };
}

export function searchCourse(key) {
  return {
    type: SEARCH_COURSE,
    key,
  }
}

export function updateCourse(courses, id) {
  return {
    type: UPDATE_COURSE,
    courses,
    id,
  }
}