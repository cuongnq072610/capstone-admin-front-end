/*
 *
 * HomePage actions
 *
 */

import { DEFAULT_ACTION, LOAD_COURSE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadCourse() {
  return {
    type: LOAD_COURSE,
  };
}
