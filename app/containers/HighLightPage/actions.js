/*
 *
 * HighLightPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_HIGHLIGHT } from './constants';

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