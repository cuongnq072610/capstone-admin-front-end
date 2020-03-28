import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  LOAD_TEACHER,
  LOAD_TEACHER_SUCCESS,
  LOAD_TEACHER_FAILURE,
  SEARCH_FAILURE_TEACHER,
  SEARCH_SUCCESS_TEACHER,
  SEARCH_TEACHER,
} from './constants';
import { fetchTeacher } from './api';
import { API_ENDPOINT, ALL_TEACHER, SEARCH_TEACHERS } from '../../constants/apis';

function* loadTeacher() {
  try {
    const response = yield call(fetchTeacher, `${API_ENDPOINT}${ALL_TEACHER}`);
    if (response.data) {
      const teachers = response.data.map(item => item)
      yield put({ type: LOAD_TEACHER_SUCCESS, payload: teachers })
    } else {
      yield put({ type: LOAD_TEACHER_FAILURE, payload: 'NO DATA' })
    }
  } catch (error) {
    yield put({ type: LOAD_TEACHER_FAILURE, payload: error })
  }
}

function* fetchSearchTeacher(action) {
  try {
    const response = yield call(fetchTeacher, `${API_ENDPOINT}${SEARCH_TEACHERS}?page=0&limit=1&detail=${action.key}`);
    if (response.data) {
      let teacherData = response.data.result.map((item, index) => {
        return item
      })
      yield put({ type: SEARCH_SUCCESS_TEACHER, payload: teacherData })
    } else {
      yield put({ type: SEARCH_FAILURE_TEACHER, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: SEARCH_FAILURE_TEACHER, payload: error });
  }
}

// Individual exports for testing
export default function* addTeacherPageSaga() {
  yield all([
    takeLatest(LOAD_TEACHER, loadTeacher),
    takeLatest(SEARCH_TEACHER, fetchSearchTeacher),
  ])
}
