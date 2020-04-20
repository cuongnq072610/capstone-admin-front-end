/*
 *
 * FaqPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_FAQ } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadFaq(page) {
  return {
    type: LOAD_FAQ,
    page,
  }
}

export function loadSearchFaq(page, key) {
  return {
    type: LOAD_FAQ,
    page,
    key,
  }
}