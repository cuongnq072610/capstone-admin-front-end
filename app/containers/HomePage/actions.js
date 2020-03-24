/*
 *
 * HomePage actions
 *
 */

import { DEFAULT_ACTION, LOAD_COURSE, SEARCH_COURSE, LOAD_DEPARTMENT } from './constants';

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

export function loadDepartment() {
  return {
    type: LOAD_DEPARTMENT,
  }
}