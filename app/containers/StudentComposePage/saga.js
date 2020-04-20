import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  LOAD_ASK_DETAIL,
  LOAD_ASK_DETAIL_FAILURE,
  LOAD_ASK_DETAIL_SUCCESS,
  CLOSE_ASK_DETAIL,
  CLOSE_ASK_DETAIL_FAILURE,
  CLOSE_ASK_DETAIL_SUCCESS,
  REOPEN_ASK_DETAIL,
  REOPEN_ASK_DETAIL_FAILURE,
  REOPEN_ASK_DETAIL_SUCCESS,
} from './constants';
import { fetchAskDetail, updateAskDetail } from './api';
import { API_ENDPOINT, GET_ASK_BY_ID, CLOSE_ASK_API } from '../../constants/apis';

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

function* closeAsk(action) {
  const { askId, rate } = action;
  try {
    let response = yield call(updateAskDetail, `${API_ENDPOINT}${CLOSE_ASK_API}/${askId}/${rate}`);
    if (response.data.success) {
      yield put({ type: CLOSE_ASK_DETAIL_SUCCESS, payload: response.data.success });
    } else if (response.data.error) {
      yield put({ type: CLOSE_ASK_DETAIL_FAILURE, payload: response.data.error })
    }
  } catch (error) {
    yield put({ type: CLOSE_ASK_DETAIL_FAILURE, payload: error })
  }
}

function* reopenAsk(action) {
  const { askId } = action;
  try {
    let response = yield call(updateAskDetail, `${API_ENDPOINT}`);
    if (response.data.success) {
      yield put({ type: REOPEN_ASK_DETAIL_SUCCESS, payload: response.data.success });
    } else if (response.data.error) {
      yield put({ type: REOPEN_ASK_DETAIL_FAILURE, payload: response.data.error })
    }
  } catch (error) {
    yield put({ type: REOPEN_ASK_DETAIL_FAILURE, payload: error })
  }
}


// Individual exports for testing
export default function* studentComposePageSaga() {
  yield all([
    takeLatest(LOAD_ASK_DETAIL, loadAskDetail),
    takeLatest(CLOSE_ASK_DETAIL, closeAsk),
    takeLatest(REOPEN_ASK_DETAIL, reopenAsk),
  ])
}
