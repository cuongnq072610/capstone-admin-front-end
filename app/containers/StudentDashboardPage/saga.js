import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOAD_STUDENT_INFO, LOAD_STUDENT_INFO_FAILURE, LOAD_STUDENT_INFO_SUCCESS, LOAD_STUDENT_STATISTIC, LOAD_STUDENT_STATISTIC_SUCCESS, LOAD_STUDENT_STATISTIC_FAILURE } from './constants';
import { fetchUserInfo, fetchUserStatistic } from './api';
import { API_ENDPOINT, GET_STUDENT_INFO, GET_STUDENT_STATISTIC } from '../../constants/apis';

function* loadUserInfo(action) {
  const { id } = action;
  try {
    let response = yield call(fetchUserInfo, `${API_ENDPOINT}${GET_STUDENT_INFO}/${id}`);
    if (response.data) {
      yield put({ type: LOAD_STUDENT_INFO_SUCCESS, payload: response.data })
    } else {
      yield put({ type: LOAD_STUDENT_INFO_FAILURE, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: LOAD_STUDENT_INFO_FAILURE, payload: error });
  }
}

function* loadStatistic(action) {
  const { id } = action;
  try {
    let response = yield call(fetchUserStatistic, `${API_ENDPOINT}${GET_STUDENT_STATISTIC}/${id}`);
    if(response.data) {
      yield put({type: LOAD_STUDENT_STATISTIC_SUCCESS, payload: response.data})
    } else {
      yield put({type: LOAD_STUDENT_STATISTIC_FAILURE, payload: "No Data"})
    }
  } catch (error) {
    yield put({type: LOAD_STUDENT_STATISTIC_FAILURE, payload: error})
  }
}

// Individual exports for testing
export default function* studentDashboardPageSaga() {
  yield all([
    takeLatest(LOAD_STUDENT_INFO, loadUserInfo),
    takeLatest(LOAD_STUDENT_STATISTIC, loadStatistic)
  ])
}
