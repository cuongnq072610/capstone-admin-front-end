/*
 *
 * TeacherPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_TEACHER, SEARCH_TEACHER, UPDATE_TEACHER, LOAD_COURSE } from './constants';

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

export function searchTeacher(key) {
  return {
    type: SEARCH_TEACHER,
    key,
  }
}

export function updateActiveTeacher(teacherId, data) {
  return {
    type: UPDATE_TEACHER,
    teacherId,
    data
  }
}

export function loadCourse() {
  return {
    type: LOAD_COURSE,
  };
}