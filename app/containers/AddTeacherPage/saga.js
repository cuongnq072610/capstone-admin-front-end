import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_TEACHER, LOAD_TEACHER_SUCCESS, LOAD_TEACHER_FAILURE } from './constants';
import { fetchTeacher } from './api';
import { API_ENDPOINT, ALL_TEACHER } from '../../constants/apis';

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


// Individual exports for testing
export default function* addTeacherPageSaga() {
  yield takeLatest(LOAD_TEACHER, loadTeacher)
}
