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

export function chooseRole(role, email) {
  return {
    type: CHOOSE_ROLE,
    role,
    email,
  };
}