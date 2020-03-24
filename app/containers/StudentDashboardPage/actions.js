/*
 *
 * StudentDashboardPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_STUDENT_INFO, LOAD_STUDENT_STATISTIC } from './constants';

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

export function loadStudentStatistic(id) {
  return {
    type: LOAD_STUDENT_STATISTIC,
    id,
  }
}