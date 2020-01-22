import { takeLatest, call, put, select } from 'redux-saga/effects';
import { LOAD_FAILURE_COURSE, LOAD_SUCCESS_COURSE, LOAD_COURSE } from './constants';

function* LoadCourse() {
  try {
    let response = yield call("")
    if (response.data.entries) {
      let courseData = response.data.entries.map((item, index) => {
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



// Individual exports for testing
export default function* homePageSaga() {
  yield takeLatest(LOAD_COURSE, LoadCourse);
}
