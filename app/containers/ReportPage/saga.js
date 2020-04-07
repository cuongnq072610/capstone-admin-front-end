import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import {
  LOAD_COURSE,
  LOAD_COURSE_FAILURE,
  LOAD_COURSE_SUCCESS,
  LOAD_TEACHER,
  LOAD_FAILURE_TEACHER,
  LOAD_SUCCESS_TEACHER
} from './constants';
import {fetchCourse, fetchTeacher } from './api';
import { API_ENDPOINT, ALL_COURSE, ALL_TEACHER } from '../../constants/apis';

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

function* LoadTeacher() {
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

// Individual exports for testing
export default function* reportPageSaga() {
  takeLatest(LOAD_COURSE, loadCourses),
  takeLatest(LOAD_TEACHER, LoadTeacher)
}
