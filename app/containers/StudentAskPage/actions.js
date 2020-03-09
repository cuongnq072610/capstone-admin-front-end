/*
 *
 * StudentAskPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_ASK } from './constants';

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