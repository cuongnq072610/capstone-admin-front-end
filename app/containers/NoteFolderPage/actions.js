/*
 *
 * NoteFolderPage actions
 *
 */

import { DEFAULT_ACTION, LOAD_NOTES_BY_FOLDER } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadNotesByFolder(courseId) {
  return {
    type: LOAD_NOTES_BY_FOLDER,
    courseId,
  };
}
