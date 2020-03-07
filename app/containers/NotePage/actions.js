/*
 *
 * NotePage actions
 *
 */

import { DEFAULT_ACTION, LOAD_NOTE, LOAD_FOLDER, CREATE_FOLDER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadNote() {
  return {
    type: LOAD_NOTE,
  }
}

export function loadFolder() {
  return {
    type: LOAD_FOLDER,
  }
}

export function createFolder(body) {
  return {
    type: CREATE_FOLDER,
    body,
  }
}