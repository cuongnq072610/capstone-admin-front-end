/*
 *
 * AddTeacherPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_TEACHER } from './constants';

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
