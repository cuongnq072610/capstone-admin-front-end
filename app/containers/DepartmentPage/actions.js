/*
 *
 * DepartmentPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_DEPARTMENT, LOAD_CREATE_DEPARTMENT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}


export function loadDepartment() {
  return {
    type: LOAD_DEPARTMENT,
  }
}

export function createDepartment(department) {
  return {
    type: LOAD_CREATE_DEPARTMENT,
    department
  }
}