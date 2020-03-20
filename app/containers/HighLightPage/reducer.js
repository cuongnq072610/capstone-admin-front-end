/*
 *
 * HighLightPage reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  DEFAULT_ACTION, 
  LOAD_HIGHLIGHT, 
  LOAD_HIGHLIGHT_SUCCESS, 
  LOAD_HIGHLIGHT_FAILURE,
  LOAD_COURSE, 
  LOAD_FAILURE_COURSE, 
  LOAD_SUCCESS_COURSE, 
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  highlights: [],
  errors: [],
  courses: [],
  isLoadingCourse: false,
});

function highLightPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_HIGHLIGHT:
      return state.set("isLoading", true);
    case LOAD_HIGHLIGHT_SUCCESS:
      return state.set("isLoading", false).set("highlights", fromJS(action.payload));
    case LOAD_HIGHLIGHT_FAILURE:
      return state.set("isLoading", false).set("errors", action.payload);
    case LOAD_COURSE:
      return state.set("isLoadingCourse", true);
    case LOAD_SUCCESS_COURSE:
      return state.set("isLoadingCourse", false).set('courses', fromJS(action.payload));
    case LOAD_FAILURE_COURSE:
      return state.set("isLoadingCourse", false).set("error", action.payload);
    default:
      return state;
  }
}

export default highLightPageReducer;
