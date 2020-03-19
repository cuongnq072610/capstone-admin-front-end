import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_ASK, LOAD_ASK_FAILURE, LOAD_ASK_SUCCESS } from './constants';
import { fetchAsks } from './api';
import { API_ENDPOINT, GET_ALL_ASK } from '../../constants/apis';

function* loadAllAsks() {
  try {
    let response = yield call(fetchAsks, `${API_ENDPOINT}${GET_ALL_ASK}`);
    if(response.data) {
      let askArr = response.data.map(item => item)
      yield put({type: LOAD_ASK_SUCCESS, payload: askArr});
    } else {
      yield put({type: LOAD_ASK_FAILURE, payload: {errors: "NO DATA"}});
    }
  } catch (error) {
    yield put({type: LOAD_ASK_FAILURE, payload: error});
  }
}

// Individual exports for testing
export default function* studentAskPageSaga() {
  yield takeLatest(LOAD_ASK, loadAllAsks);
}