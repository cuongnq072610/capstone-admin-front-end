import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import {
  LOAD_COURSE,
  LOAD_COURSE_FAILURE,
  LOAD_COURSE_SUCCESS,
  LOAD_TEACHER,
  LOAD_FAILURE_TEACHER,
  LOAD_SUCCESS_TEACHER,
  LOAD_REPORT,
  LOAD_REPORT_FAILURE,
  LOAD_REPORT_SUCCESS,
} from './constants';
import { fetchCourse, fetchTeacher, fetchReportData } from './api';
import { API_ENDPOINT, ALL_COURSE, ALL_TEACHER, GET_REPORT } from '../../constants/apis';
import queryString from 'query-string';

function* loadCourses() {
  try {
    let response = yield call(fetchCourse, `${API_ENDPOINT}${ALL_COURSE}`);
    if (response.data) {
      yield put({ type: LOAD_COURSE_SUCCESS, payload: response.data })
    } else {
      yield put({ type: LOAD_COURSE_FAILURE, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: LOAD_COURSE_FAILURE, payload: error });
  }
}

function* LoadTeachers() {
  try {
    const response = yield call(fetchTeacher, `${API_ENDPOINT}${ALL_TEACHER}`);
    if (response.data) {
      const teachers = response.data.map(item => item)
      yield put({ type: LOAD_SUCCESS_TEACHER, payload: teachers })
    } else {
      yield put({ type: LOAD_FAILURE_TEACHER, payload: 'NO DATA' })
    }
  } catch (error) {
    yield put({ type: LOAD_FAILURE_TEACHER, payload: error })
  }
}

function* loadReport(action) {
  const { filter } = action;
  const paramString = queryString.stringify(filter);
  console.log(`${API_ENDPOINT}${GET_REPORT}/${paramString}`)

  try {
    let response = yield call(fetchReportData, `${API_ENDPOINT}${GET_REPORT}?${paramString}`);
    if (response.data) {
      const reports = response.data.map(item => item);
      yield put({ type: LOAD_REPORT_SUCCESS, payload: reports });
    }
    else {
      yield put({ type: LOAD_REPORT_FAILURE, payload: "NO DATA" });
    }
  } catch (error) {
    yield put({ type: LOAD_REPORT_FAILURE, payload: error });
  }
}

// Individual exports for testing
export default function* reportPageSaga() {
  yield all([
    takeLatest(LOAD_COURSE, loadCourses),
    takeLatest(LOAD_TEACHER, LoadTeachers),
    takeLatest(LOAD_REPORT, loadReport),
  ])
}
