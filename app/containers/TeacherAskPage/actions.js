/*
 *
 * StudentAskPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_ASK, SEARCH_ASK } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAsk() {
  return {
    type: LOAD_ASK,
  }
}

export function searchAsk(key) {
  return {
    type: SEARCH_ASK,
    key,
  }
}