/*
 *
 * AddCoursePage actions
 *
 */

import { DEFAULT_ACTION, ADD_COURSE, UPDATE_COURSE, LOAD_DEPARTMENT, DELETE_COURSE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addCourse(course) {
  return {
    type: ADD_COURSE,
    course
  };
}

export function updateCourse(course) {
  return {
    type: UPDATE_COURSE,
    course
  };
}

export function loadDepartment() {
  return {
    type: LOAD_DEPARTMENT,
  }
}

export function deleteCourse(id) {
  return {
    type: DELETE_COURSE,
    id,
  };
}