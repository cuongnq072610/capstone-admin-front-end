/*
 *
 * DashboardPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_ADMIN_STATISTIC } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAdminStatistic() {
  return {
    type: LOAD_ADMIN_STATISTIC,
  }
}