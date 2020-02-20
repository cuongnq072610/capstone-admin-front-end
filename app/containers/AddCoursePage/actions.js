/*
 *
 * AddCoursePage actions
 *
 */

import { DEFAULT_ACTION, ADD_COURSE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addCourse() {
  return {
    type: ADD_COURSE,
  };
}