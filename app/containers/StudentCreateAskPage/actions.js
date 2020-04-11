/*
 *
 * StudentCreateAskPage actions
 *
 */

import { DEFAULT_ACTION, CREATE_ASK, LOAD_STUDENT_INFO, LOAD_TEACHER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createAsk(ask) {
  return {
    type: CREATE_ASK,
    ask,
  }
}

export function loadStudentInfo() {
  return {
    type: LOAD_STUDENT_INFO,
  }
}

export function loadTeacher() {
  return {
    type: LOAD_TEACHER,
  };
}