import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import {
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
import { fetchFaqData, deleteFaq } from './api';
import { API_ENDPOINT, SEARCH_FAQ_API, LOAD_DETAIL_API, ALL_COURSE, REMOVE_FAQ, LOAD_FILTER_FAQ } from '../../constants/apis';

function* loadFaqData(action) {
  const { page, course } = action;
  try {
    let response = yield call(fetchFaqData, `${API_ENDPOINT}${LOAD_FILTER_FAQ}/?teacherID=&courseCode=${course}&page=${page}`);
    if (response.data) {
      let faqData = response.data.result.map(faq => faq);
      yield put({ type: LOAD_FAQ_SUCCESS, payload: faqData, number: response.data.totalPage });
    } else {
      yield put({ type: LOAD_FAQ_FAILURE, payload: 'No data' });
    }
  } catch (error) {
    yield put({ type: LOAD_FAQ_FAILURE, payload: error });
  }
}

function* loadSearchFaqData(action) {
  const { page, key } = action;
  try {
    let response = yield call(fetchFaqData, `${API_ENDPOINT}${SEARCH_FAQ_API}?detail=${key}&page=${page}`);
    if (response.data) {
      let faqData = response.data.result.map(faq => faq);
      yield put({ type: SEARCH_FAQ_SUCCESS, payload: faqData, number: response.data.totalPage });
    } else {
      yield put({ type: SEARCH_FAQ_FAILURE, payload: 'No data' });
    }
  } catch (error) {
    yield put({ type: SEARCH_FAQ_FAILURE, payload: error });
  }
}

function* loadFaqChosenData(action) {
  const { id } = action;
  try {
    let response = yield call(fetchFaqData, `${API_ENDPOINT}${LOAD_DETAIL_API}/${id}`);
    if (response.data) {
      let chosen = response.data;
      yield put({ type: LOAD_DETAIL_SUCCESS, payload: chosen });
    } else {
      yield put({ type: LOAD_DETAIL_FAILURE, payload: 'No data' });
    }
  } catch (error) {
    yield put({ type: LOAD_DETAIL_FAILURE, payload: error });
  }
}

function* loadCourse() {
  try {
    let response = yield call(fetchFaqData, `${API_ENDPOINT}${ALL_COURSE}`)
    if (response.data) {
      let courseData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: LOAD_COURSE_SUCCESS, payload: courseData })
    } else {
      yield put({ type: LOAD_COURSE_FAILURE, payload: "NO DATA" })
    }
  } catch (err) {
    yield put({ type: LOAD_COURSE_FAILURE, payload: err })
  }
}

function* removeFaq(action) {
  const { id } = action;
  try {
    let response = yield call(deleteFaq, `${API_ENDPOINT}${REMOVE_FAQ}/${id}`);
    if (response.data.success) {
      yield put({ type: DELETE_FAQ_SUCCESS, payload: response.data.success });
    } else if (response.data.error) {
      yield put({ type: DELETE_FAQ_FAILURE, payload: response.data.error });
    }
  } catch (error) {
    yield put({ type: DELETE_FAQ_FAILURE, payload: error });
  }
}

function* loadFaqDataByTeacher(action) {
  const { page, course, teacherId } = action;
  console.log(`${API_ENDPOINT}${LOAD_FILTER_FAQ}/?teacherID=${teacherId}&course=${course}&page=${page}`)
  try {
    let response = yield call(fetchFaqData, `${API_ENDPOINT}${LOAD_FILTER_FAQ}/?teacherID=${teacherId}&courseCode=${course}&page=${page}`);
    if (response.data) {
      let faqData = response.data.result.map(faq => faq);
      yield put({ type: LOAD_FAQ_BY_TEACHER_SUCCESS, payload: faqData, number: response.data.totalPage });
    } else {
      yield put({ type: LOAD_FAQ_BY_TEACHER_FAILURE, payload: 'No data' });
    }
  } catch (error) {
    yield put({ type: LOAD_FAQ_BY_TEACHER_FAILURE, payload: error });
  }
}

// Individual exports for testing
export default function* faqPageSaga() {
  yield all([
    takeLatest(LOAD_FAQ, loadFaqData),
    takeLatest(SEARCH_FAQ, loadSearchFaqData),
    takeLatest(LOAD_DETAIL, loadFaqChosenData),
    takeLatest(LOAD_COURSE, loadCourse),
    takeLatest(DELETE_FAQ, removeFaq),
    takeLatest(LOAD_FAQ_BY_TEACHER, loadFaqDataByTeacher),
  ])
}
