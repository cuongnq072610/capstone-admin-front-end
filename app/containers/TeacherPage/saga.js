import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  LOAD_SUCCESS_TEACHER,
  LOAD_FAILURE_TEACHER,
  LOAD_TEACHER,
  SEARCH_TEACHER,
  SEARCH_SUCCESS_TEACHER,
  SEARCH_FAILURE_TEACHER,
  UPDATE_TEACHER,
  UPDATE_SUCCESS_TEACHER,
  UPDATE_FAILURE_TEACHER
} from './constants';
import { API_ENDPOINT, ALL_TEACHER, SEARCH_TEACHERS, UPDATE_TEACHER_ACTIVE } from '../../constants/apis';
import { fetchTeacher, updateTeacherApi } from './api';

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

function* updateActiveTeacher(action) {
  try {
    const response = yield call(updateTeacherApi, `${API_ENDPOINT}${UPDATE_TEACHER_ACTIVE}/${action.teacherId}`, action.data);
    const responseTeacher = yield call(fetchTeacher, `${API_ENDPOINT}${ALL_TEACHER}`);
    if (response.data && responseTeacher.data) {
      const teachers = responseTeacher.data.map(item => item)
      yield put({ type: UPDATE_SUCCESS_TEACHER, payload: response.data.message, payloadTeachers: teachers })
    } else {
      yield put({ type: UPDATE_FAILURE_TEACHER, payload: "UPDATE FAIL" })
    }
  } catch (error) {
    yield put({ type: UPDATE_FAILURE_TEACHER, payload: error })
  }
}


// Individual exports for testing
export default function* teacherPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(LOAD_TEACHER, LoadTeacher),
    takeLatest(SEARCH_TEACHER, fetchSearchTeacher),
    takeLatest(UPDATE_TEACHER, updateActiveTeacher)
  ])
}
