/*
 *
 * FaqPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_FAQ, SEARCH_FAQ, LOAD_DETAIL, LOAD_COURSE, DELETE_FAQ, LOAD_FAQ_BY_TEACHER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadFaq(page, course) {
  return {
    type: LOAD_FAQ,
    page,
    course,
  }
}

export function loadSearchFaq(page, key, chosenCourse) {
  return {
    type: SEARCH_FAQ,
    page,
    key,
    chosenCourse,
  }
}

export function loadFaqDetail(id) {
  return {
    type: LOAD_DETAIL,
    id,
  }
}

export function loadCourse() {
  return {
    type: LOAD_COURSE,
  }
}

export function removeFaq(id) {
  return {
    type: DELETE_FAQ,
    id,
  }
}

export function loadFaqByTeacher(teacherId, course, page) {
  return {
    type: LOAD_FAQ_BY_TEACHER,
    teacherId,
    course,
    page,
  }
}