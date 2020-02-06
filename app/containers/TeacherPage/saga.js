import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_SUCCESS_TEACHER, LOAD_FAILURE_TEACHER, LOAD_TEACHER } from './constants';

function* LoadTeacher() {
  try {
    let response = yield call("")
    if (response.data.entries) {
      let teacherData = response.data.entries.map((item, index) => {
        return item
      })
      yield put({ type: LOAD_SUCCESS_TEACHER, payload: teacherData })
    } else {
      yield put({ type: LOAD_FAILURE_TEACHER, payload: "NO DATA" })
    }
  } catch (err) {
      yield put({ type: LOAD_FAILURE_TEACHER, payload: err })
  }
}

// Individual exports for testing
export default function* teacherPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOAD_TEACHER, LoadTeacher);
}
