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
} from './constants';
import { fetchFaqData } from './api';
import { API_ENDPOINT, LOAD_FAQ_BY_COURSE, SEARCH_FAQ_API, LOAD_DETAIL_API, ALL_COURSE } from '../../constants/apis';

function* loadFaqData(action) {
  const { page, course } = action;
  try {
    let response = yield call(fetchFaqData, `${API_ENDPOINT}${LOAD_FAQ_BY_COURSE}?course=${course}&page=${page}`);
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

// Individual exports for testing
export default function* faqPageSaga() {
  yield all([
    takeLatest(LOAD_FAQ, loadFaqData),
    takeLatest(SEARCH_FAQ, loadSearchFaqData),
    takeLatest(LOAD_DETAIL, loadFaqChosenData),
    takeLatest(LOAD_COURSE, loadCourse),
  ])
}
