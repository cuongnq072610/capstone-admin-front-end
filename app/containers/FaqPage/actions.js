/*
 *
 * FaqPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_FAQ, SEARCH_FAQ, LOAD_DETAIL, LOAD_COURSE } from './constants';

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

export function loadSearchFaq(page, key) {
  return {
    type: SEARCH_FAQ,
    page,
    key,
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