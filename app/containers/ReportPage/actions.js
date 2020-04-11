/*
 *
 * ReportPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_COURSE, LOAD_TEACHER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadCourse() {
  return {
    type: LOAD_COURSE
  }
}

export function loadTeacher() {
  return {
    type: LOAD_TEACHER
  };
}
