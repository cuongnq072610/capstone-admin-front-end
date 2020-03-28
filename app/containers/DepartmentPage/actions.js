/*
 *
 * DepartmentPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_DEPARTMENT, LOAD_CREATE_DEPARTMENT, LOAD_DELETE_DEPARTMENT, LOAD_UPDATE_DEPARTMENT, SEARCH_DEPARTMENT } from './constants';

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

export function deleteDepartment(id) {
  return {
    type: LOAD_DELETE_DEPARTMENT,
    id,
  }
}

export function updateDepartment(department, id) {
  return {
    type: LOAD_UPDATE_DEPARTMENT,
    department,
    id
  }
}

export function searchDepartment(key) {
  return {
    type: SEARCH_DEPARTMENT,
    key,
  }
}
