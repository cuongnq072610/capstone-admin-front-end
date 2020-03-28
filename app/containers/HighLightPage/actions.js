/*
 *
 * HighLightPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_HIGHLIGHT, DELETE_HIGHLIGHT, LOAD_FOLDER, SEARCH_HIGHLIGHT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadHighlight() {
  return {
    type: LOAD_HIGHLIGHT,
  };
}

export function loadStudentCourses(id) {
  return {
    type: LOAD_FOLDER,
    id
  }
}

export function loadDeleteHighlight(id) {
  return {
    type: DELETE_HIGHLIGHT,
    id,
  }
}

export function searchHighlight(key) {
  return {
    type: SEARCH_HIGHLIGHT,
    key,
  }
}