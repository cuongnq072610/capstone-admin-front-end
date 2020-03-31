import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import {
  CREATE_ASK,
  CREATE_ASK_FAILURE,
  CREATE_ASK_SUCCESS
} from './constants';
import { createNewAsk } from './api';
import { API_ENDPOINT, CREATE_ASK_API } from '../../constants/apis';

function* createAsk(action) {
  const { ask } = action;
  try {
    let response = yield call(createNewAsk, `${API_ENDPOINT}${CREATE_ASK_API}`, ask)
    if (response.data.success) {
      yield put({ type: CREATE_ASK_SUCCESS, payload: response.data.success });
    } else if (response.data.error) {
      yield put({ type: CREATE_ASK_FAILURE, payload: response.data.error });
    }
  } catch (error) {
    yield put({ type: CREATE_ASK_FAILURE, payload: error });
  }
}

// Individual exports for testing
export default function* studentCreateAskPageSaga() {
  yield all([
    takeLatest(CREATE_ASK, createAsk),
  ])
}
