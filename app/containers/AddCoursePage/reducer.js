/*
 *
 * AddCoursePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, ADD_COURSE, ADD_COURSE_SUCCESS, ADD_COURSE_FAILURE } from './constants';

export const initialState = fromJS({
  error: "",

});

function addCoursePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADD_COURSE:
      return state;
    case ADD_COURSE_SUCCESS:
      return state;
    case ADD_COURSE_FAILURE:
      return state;
    default:
      return state;
  }
}

export default addCoursePageReducer;
