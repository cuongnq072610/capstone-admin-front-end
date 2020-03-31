/*
 *
 * StudentCreateAskPage actions
 *
 */

import { DEFAULT_ACTION, CREATE_ASK } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createAsk(ask) {
  return {
    type: CREATE_ASK,
    ask,
  }
}
