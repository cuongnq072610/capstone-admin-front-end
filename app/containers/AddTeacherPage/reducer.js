/*
 *
 * AddTeacherPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOAD_TEACHER, LOAD_TEACHER_SUCCESS, LOAD_TEACHER_FAILURE } from './constants';

export const initialState = fromJS({
  isLoading: false,
  teachers: [],
  error: ''
});

function addTeacherPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_TEACHER:
      return state.set("isLoading",true);
    case LOAD_TEACHER_SUCCESS:
      return state.set("teachers", action.payload).set("isLoading", false);
    case LOAD_TEACHER_FAILURE:
      return state.set("error", action.payload).set("isLoading", false);;
    default:
      return state;
  }
}

export default addTeacherPageReducer;
