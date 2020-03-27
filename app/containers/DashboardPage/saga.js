import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT, GET_ADMIN_STATISTIC } from '../../constants/apis';
import { fetchAdminStatistic } from './api';
import { LOAD_ADMIN_STATISTIC_SUCCESS, LOAD_ADMIN_STATISTIC_FAILURE, LOAD_ADMIN_STATISTIC } from './constants';

function* loadStatistic() {
  try {
    let response = yield call(fetchAdminStatistic, `${API_ENDPOINT}${GET_ADMIN_STATISTIC}`);
    if (response.data) {
      yield put({ type: LOAD_ADMIN_STATISTIC_SUCCESS, payload: response.data })
    } else {
      yield put({ type: LOAD_ADMIN_STATISTIC_FAILURE, payload: "No Data" })
    }
  } catch (error) {
    yield put({ type: LOAD_ADMIN_STATISTIC_FAILURE, payload: error })
  }
}

// Individual exports for testing
export default function* dashboardPageSaga() {
  yield all([
    takeLatest(LOAD_ADMIN_STATISTIC, loadStatistic)
  ])
}
