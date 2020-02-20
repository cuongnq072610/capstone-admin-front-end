import { takeLatest, call, put, select } from 'redux-saga/effects';
import { LOAD_FAILURE_COURSE, LOAD_SUCCESS_COURSE, LOAD_COURSE } from './constants';
import { API_ENDPOINT, ALL_COURSE } from '../../constants/apis';
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



// Individual exports for testing
export default function* homePageSaga() {
  yield takeLatest(LOAD_COURSE, LoadCourse);
}
