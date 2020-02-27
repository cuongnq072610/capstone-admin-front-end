import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOAD_SUCCESS_TEACHER, LOAD_FAILURE_TEACHER, LOAD_TEACHER, SEARCH_TEACHER } from './constants';
import { API_ENDPOINT, ALL_TEACHER } from '../../constants/apis';
import { fetchTeacher } from './api';

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
  console.log(action.key)
}

// Individual exports for testing
export default function* teacherPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(LOAD_TEACHER, LoadTeacher),
    takeLatest(SEARCH_TEACHER, fetchSearchTeacher),
  ])
}
