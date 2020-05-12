/*
 *
 * ChooseRolePage actions
 *
 */

import { DEFAULT_ACTION, CHOOSE_ROLE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function chooseRole(role) {
  return {
    type: CHOOSE_ROLE,
    role,
  };
}