/*
 *
 * FaqPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_FAQ,
  LOAD_FAQ_FAILURE,
  LOAD_FAQ_SUCCESS,
  SEARCH_FAQ,
  SEARCH_FAQ_FAILURE,
  SEARCH_FAQ_SUCCESS,
  LOAD_DETAIL,
  LOAD_DETAIL_FAILURE,
  LOAD_DETAIL_SUCCESS,
  LOAD_COURSE,
  LOAD_COURSE_FAILURE,
  LOAD_COURSE_SUCCESS,
  DELETE_FAQ,
  DELETE_FAQ_FAILURE,
  DELETE_FAQ_SUCCESS,
  LOAD_FAQ_BY_TEACHER,
  LOAD_FAQ_BY_TEACHER_FAILURE,
  LOAD_FAQ_BY_TEACHER_SUCCESS,
} from './constants';

export const initialState = fromJS({
  isLoading: false,
  isLoadingDetail: false,
  isLoadingCourse: false,
  isLoadingDelete: false,
  faq: [],
  chosen: {},
  error: "",
  totalPage: "",
  courses: [],
  message: "",
});

function faqPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_FAQ:
      return state.set("isLoading", true);
    case LOAD_FAQ_SUCCESS:
      return state.set("isLoading", false).set("faq", fromJS(action.payload)).set("totalPage", action.number);
    case LOAD_FAQ_FAILURE:
      return state.set("isLoading", false).set("error", action.payload);
    case SEARCH_FAQ:
      return state.set("isLoading", true);
    case SEARCH_FAQ_SUCCESS:
      return state.set("isLoading", false).set("faq", fromJS(action.payload)).set("totalPage", action.number);
    case SEARCH_FAQ_FAILURE:
      return state.set("isLoading", false).set("error", action.payload);
    case LOAD_DETAIL:
      return state.set("isLoadingDetail", true);
    case LOAD_DETAIL_SUCCESS:
      return state.set("isLoadingDetail", false).set("chosen", fromJS(action.payload));
    case LOAD_DETAIL_FAILURE:
      return state.set("isLoadingDetail", false).set("error", action.payload);
    case LOAD_COURSE:
      return state.set("isLoadingCourse", true);
    case LOAD_COURSE_SUCCESS:
      return state.set("isLoadingCourse", false).set("courses", fromJS(action.payload));
    case LOAD_COURSE_FAILURE:
      return state.set("isLoadingCourse", false).set("error", action.payload);
    case DELETE_FAQ:
      return state.set("isLoadingDelete", true).set("message", "");
    case DELETE_FAQ_SUCCESS:
      return state.set("isLoadingDelete", false).set("message", fromJS(action.payload))
    case DELETE_FAQ_FAILURE:
      return state.set("isLoadingDelete", false).set("error", action.payload);
    case LOAD_FAQ_BY_TEACHER:
      return state.set("isLoading", true);
    case LOAD_FAQ_BY_TEACHER_SUCCESS:
      return state.set("isLoading", false).set("faq", fromJS(action.payload)).set("totalPage", action.number);
    case LOAD_FAQ_BY_TEACHER_FAILURE:
      return state.set("isLoading", false).set("error", action.payload);
    default:
      return state;
  }
}

export default faqPageReducer;
