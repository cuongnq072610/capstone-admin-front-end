/*
 *
 * HighLightPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_HIGHLIGHT, LOAD_COURSE, DELETE_HIGHLIGHT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadHighlight() {
  return {
    type: LOAD_HIGHLIGHT,
  };
}

export function loadStudentCourses(id) {
  return {
    type: LOAD_COURSE,
    id
  }
}

export function loadDeleteHighlight(id) {
  return {
    type: DELETE_HIGHLIGHT,
    id,
  }
}