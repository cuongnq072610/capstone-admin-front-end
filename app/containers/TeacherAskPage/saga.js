import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOAD_ASK, LOAD_ASK_FAILURE, LOAD_ASK_SUCCESS, SEARCH_ASK, SEARCH_ASK_SUCCESS, SEARCH_ASK_FAILURE } from './constants';
import { fetchAsks } from './api';
import { API_ENDPOINT, GET_ALL_ASK_TEACHER, SEARCH_ASK_API } from '../../constants/apis';

function* loadAllAsks() {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    let response = yield call(fetchAsks, `${API_ENDPOINT}${GET_ALL_ASK_TEACHER}/${user.profile}`);
    if (response.data) {
      let askArr = response.data.map(item => item)
      yield put({ type: LOAD_ASK_SUCCESS, payload: askArr });
    } else {
      yield put({ type: LOAD_ASK_FAILURE, payload: { errors: "NO DATA" } });
    }
  } catch (error) {
    yield put({ type: LOAD_ASK_FAILURE, payload: error });
  }
}

function* loadSearchAsks(action) {
  const { key } = action;
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user + " === " + key)
  try {
    let response = yield call(fetchAsks, `${API_ENDPOINT}${SEARCH_ASK_API}/?userID=${user.profile}&text=${key}`);
    if (response.data) {
      let askArr = response.data.map(item => item)
      yield put({ type: SEARCH_ASK_SUCCESS, payload: askArr });
    } else {
      yield put({ type: SEARCH_ASK_FAILURE, payload: { errors: "NO DATA" } });
    }
  } catch (error) {
    yield put({ type: SEARCH_ASK_FAILURE, payload: error });
  }
}

// Individual exports for testing
export default function* studentAskPageSaga() {
  yield all([
    takeLatest(LOAD_ASK, loadAllAsks),
    takeLatest(SEARCH_ASK, loadSearchAsks)
  ]);
}
