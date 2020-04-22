/*
 *
 * StudentDashboardPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_STUDENT_INFO, LOAD_STUDENT_STATISTIC, LOAD_EXIT_COURSE } from './constants';

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

export function loadExitCourse(courseId) {
  return {
    type: LOAD_EXIT_COURSE,
    courseId,
  }
}