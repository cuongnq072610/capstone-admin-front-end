/*
 *
 * StudentComposePage actions
 *
 */

import { DEFAULT_ACTION, LOAD_ASK_DETAIL, CLOSE_ASK_DETAIL, REOPEN_ASK_DETAIL } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadAskDetail(askId) {
  return {
    type: LOAD_ASK_DETAIL,
    askId,
  }
}

export function closeAsk(askId, rate) {
  return {
    type: CLOSE_ASK_DETAIL,
    askId,
    rate,
  }
}

export function reopenAsk(askId) {
  return {
    type: REOPEN_ASK_DETAIL,
    askId,
  }
}