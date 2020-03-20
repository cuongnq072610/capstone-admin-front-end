/*
 *
 * HighLightPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_HIGHLIGHT, LOAD_COURSE } from './constants';

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