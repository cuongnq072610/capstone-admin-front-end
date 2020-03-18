/*
 *
 * StudentDashboardPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_STUDENT_INFO } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadStudentInfo(id) {
  return {
    type: LOAD_STUDENT_INFO,
    id
  }
}