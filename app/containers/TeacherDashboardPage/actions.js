/*
 *
 * TeacherDashboardPage actions
 *
 */

import { DEFAULT_ACTION, GET_TEACHER_STATISTIC } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getStatistic(id) {
  return {
    type: GET_TEACHER_STATISTIC,
    id,
  };
}
