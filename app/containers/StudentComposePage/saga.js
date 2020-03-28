import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOAD_ASK_DETAIL, LOAD_ASK_DETAIL_FAILURE, LOAD_ASK_DETAIL_SUCCESS } from './constants';
import { fetchAskDetail } from './api';
import { API_ENDPOINT, GET_ASK_BY_ID } from '../../constants/apis';

function* loadAskDetail(action) {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    let response = yield call(fetchAskDetail, `${API_ENDPOINT}${GET_ASK_BY_ID}/${user.profile}/${action.askId}`);
    if (response.data) {
      yield put({ type: LOAD_ASK_DETAIL_SUCCESS, payload: response.data });
    } else {
      yield put({ type: LOAD_ASK_DETAIL_FAILURE, payload: { error: "NO DATA" } });
    }
  } catch (error) {
    yield put({ type: LOAD_ASK_DETAIL_FAILURE, payload: error });
  }
}

// Individual exports for testing
export default function* studentComposePageSaga() {
  yield all([
    takeLatest(LOAD_ASK_DETAIL, loadAskDetail),
  ])
}
