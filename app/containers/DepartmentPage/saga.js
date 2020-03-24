import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import { fetchDepartment } from './api';
import { API_ENDPOINT, GET_ALL_DEPARTMENT } from '../../constants/apis';
import { LOAD_SUCCESS_DEPARTMENT, LOAD_FAILURE_DEPARTMENT, LOAD_DEPARTMENT } from './constants';

function* loadDepartment() {
  try {
    let response = yield call(fetchDepartment, `${API_ENDPOINT}${GET_ALL_DEPARTMENT}`);
    if (response.data) {
      let departmentData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: LOAD_SUCCESS_DEPARTMENT, payload: departmentData })
    } else {
      yield put({ type: LOAD_FAILURE_DEPARTMENT, payload: "NO DATA" })
    }
  } catch (err) {
    yield put({ type: LOAD_FAILURE_DEPARTMENT, payload: err })
  }
}

// Individual exports for testing
export default function* departmentPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(LOAD_DEPARTMENT, loadDepartment),
  ])
}
