/*
 *
 * HighLightFolderPage actions
 *
 */

import { DEFAULT_ACTION, LOAD__HIGHLIGHT_BY_FOLDER, DELETE_HIGHLIGHT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadHighlightByFolder(courseId) {
  return {
    type: LOAD__HIGHLIGHT_BY_FOLDER,
    courseId,
  };
}

export function loadDeleteHighlight(id) {
  return {
    type: DELETE_HIGHLIGHT,
    id,
  }
}