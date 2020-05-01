import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import {
  LOAD_FAQ,
  LOAD_FAQ_FAILURE,
  LOAD_FAQ_SUCCESS,
  SEARCH_FAQ,
  SEARCH_FAQ_FAILURE,
  SEARCH_FAQ_SUCCESS,
} from './constants';
import { fetchFaqData } from './api';
import { API_ENDPOINT, LOAD_FAQ_API, SEARCH_FAQ_API } from '../../constants/apis';

function* loadFaqData(action) {
  const { page } = action;
  try {
    let response = yield call(fetchFaqData, `${API_ENDPOINT}${LOAD_FAQ_API}?page=${page}`);
    if (response.data) {
      let faqData = response.data.result.map(faq => faq);
      yield put({ type: LOAD_FAQ_SUCCESS, payload: faqData, number: response.data.totalPage });
    } else {
      yield put({ type: LOAD_FAQ_FAILURE, payload: 'No data' });
    }
  } catch (error) {
    yield put({ type: LOAD_FAQ_FAILURE, payload: error });
  }
}

function* loadSearchFaqData(action) {
  const { page, key } = action;
  try {
    let response = yield call(fetchFaqData, `${API_ENDPOINT}${SEARCH_FAQ_API}?detail=${key}&page=${page}`);
    if (response.data) {
      let faqData = response.data.result.map(faq => faq);
      console.log(faqData)
      yield put({ type: SEARCH_FAQ_SUCCESS, payload: faqData, number: response.data.totalPage });
    } else {
      yield put({ type: SEARCH_FAQ_FAILURE, payload: 'No data' });
    }
  } catch (error) {
    yield put({ type: SEARCH_FAQ_FAILURE, payload: error });
  }
}

// Individual exports for testing
export default function* faqPageSaga() {
  yield all([
    takeLatest(LOAD_FAQ, loadFaqData),
    takeLatest(SEARCH_FAQ, loadSearchFaqData),
  ])
}