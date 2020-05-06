import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  LOAD_ASK_DETAIL,
  LOAD_ASK_DETAIL_FAILURE,
  LOAD_ASK_DETAIL_SUCCESS,
  CLOSE_ASK_DETAIL,
  CLOSE_ASK_DETAIL_FAILURE,
  CLOSE_ASK_DETAIL_SUCCESS,
  PIN_FAQ,
  PIN_FAQ_FAILURE,
  PIN_FAQ_SUCCESS,
  DELETE_FAQ,
  DELETE_FAQ_FAILURE,
  DELETE_FAQ_SUCCESS,
} from './constants';
import { fetchAskDetail, closeAskDetail, createFaq, deleteFaq } from './api';
import { API_ENDPOINT, GET_ASK_BY_ID, CLOSE_ASK_API, CREATE_FAQ, REMOVE_FAQ } from '../../constants/apis';

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
  const { askId } = action;
  try {
    let response = yield call(closeAskDetail, `${API_ENDPOINT}${CLOSE_ASK_API}/${askId}/0`);
    if (response.data.success) {
      yield put({ type: CLOSE_ASK_DETAIL_SUCCESS, payload: response.data.success });
    } else if (response.data.error) {
      yield put({ type: CLOSE_ASK_DETAIL_FAILURE, payload: response.data.error })
    }
  } catch (error) {
    yield put({ type: CLOSE_ASK_DETAIL_FAILURE, payload: error })
  }
}

function* createNewFaq(action) {
  const { askID, answer } = action;
  try {
    let response = yield call(createFaq, `${API_ENDPOINT}${CREATE_FAQ}`, { askID, answer });
    if (response.data.success) {
      yield put({ type: PIN_FAQ_SUCCESS, payload: response.data.success });
    } else if (response.data.error) {
      yield put({ type: PIN_FAQ_FAILURE, payload: response.data.error });
    }
  } catch (error) {
    yield put({ type: PIN_FAQ_FAILURE, payload: error });
  }
}

function* removeFaq(action) {
  const { id } = action;
  try {
    let response = yield call(deleteFaq, `${API_ENDPOINT}${REMOVE_FAQ}/${id}`);
    if (response.data.success) {
      yield put({ type: DELETE_FAQ_SUCCESS, payload: response.data.success });
    } else if (response.data.error) {
      yield put({ type: DELETE_FAQ_FAILURE, payload: response.data.error });
    }
  } catch (error) {
    yield put({ type: DELETE_FAQ_FAILURE, payload: error });
  }
}

// Individual exports for testing
export default function* studentComposePageSaga() {
  yield all([
    takeLatest(LOAD_ASK_DETAIL, loadAskDetail),
    takeLatest(CLOSE_ASK_DETAIL, closeAsk),
    takeLatest(PIN_FAQ, createNewFaq),
    takeLatest(DELETE_FAQ, removeFaq),
  ])
}
