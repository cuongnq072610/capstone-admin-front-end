import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import { LOAD_COURSE, SEARCH_COURSE, LOAD_SUCCESS_COURSE, LOAD_FAILURE_COURSE, SEARCH_SUCCESS_COURSE, SEARCH_FAILURE_COURSE } from './constants';
import { API_ENDPOINT, ALL_COURSE, SEARCH_COURSES } from '../../constants/apis';
import { fetchCourse } from './api';

function* LoadCourse() {
  try {
    let response = yield call(fetchCourse, `${API_ENDPOINT}${ALL_COURSE}`)
    if (response.data) {
      let courseData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: LOAD_SUCCESS_COURSE, payload: courseData })
    } else {
      yield put({ type: LOAD_FAILURE_COURSE, payload: "NO DATA" })
    }
  } catch (err) {
    yield put({ type: LOAD_FAILURE_COURSE, payload: err })
  }
}

function* fetchSearchCourse(action) {
  try {
    const response = yield call(fetchCourse, `${API_ENDPOINT}${SEARCH_COURSES}?page=0&limit=1&detail=${action.key}`);
    if (response.data) {
      let courseData = response.data.result.map((item, index) => {
        return item
      })
      yield put({ type: SEARCH_SUCCESS_COURSE, payload: courseData })
    } else {
      yield put({ type: SEARCH_FAILURE_COURSE, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: SEARCH_FAILURE_COURSE, payload: error });
  }
}

// Individual exports for testing
export default function* studentAddCoursePageSaga() {
  yield all([
    takeLatest(LOAD_COURSE, LoadCourse),
    takeLatest(SEARCH_COURSE, fetchSearchCourse),
  ]);
}
