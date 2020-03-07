import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_HIGHLIGHT, LOAD_HIGHLIGHT_FAILURE, LOAD_HIGHLIGHT_SUCCESS } from './constants';
import { fetchHighlight } from './api';
import { API_ENDPOINT, GET_ALL_HIGHLIGHT } from '../../constants/apis';

function* getAllHighlight() {
  try {
    const response = yield call(fetchHighlight(`${API_ENDPOINT}${GET_ALL_HIGHLIGHT}`));
    if (response.data) {
      console.log(response.data)
    } else {
      yield put({ type: LOAD_HIGHLIGHT_FAILURE, payload: {msg : "NO_DATA"} });
    }
  } catch (error) {
    yield put({ type: LOAD_HIGHLIGHT_FAILURE, payload: error });
  }
}

// Individual exports for testing
export default function* highLightPageSaga() {
  yield all([
    takeLatest(LOAD_HIGHLIGHT, getAllHighlight),
  ])
}
