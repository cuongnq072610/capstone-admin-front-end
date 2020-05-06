/*
 *
 * StudentComposePage actions
 *
 */

import { DEFAULT_ACTION, LOAD_ASK_DETAIL, CLOSE_ASK_DETAIL, PIN_FAQ, DELETE_FAQ } from './constants';

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

export function closeAsk(askId) {
  return {
    type: CLOSE_ASK_DETAIL,
    askId,
  }
}

export function pinFaq(askID, answer) {
  return {
    type: PIN_FAQ,
    askID,
    answer,
  }
}

export function removeFaq(id) {
  return {
    type: DELETE_FAQ,
    id,
  }
}