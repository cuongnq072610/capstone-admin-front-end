import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_TEACHER_STATISTIC,
  GET_TEACHER_STATISTIC_FAILURE,
  GET_TEACHER_STATISTIC_SUCCESS,
} from './constants';
import { getTeacherStatistic } from './api';
import { API_ENDPOINT, GET_TEACHER_STATISTIC_API } from '../../constants/apis';

function* loadTeacherStatistic(action) {
  const { id } = action;
  try {
    let response = yield call(getTeacherStatistic, `${API_ENDPOINT}${GET_TEACHER_STATISTIC_API}/${id}`);
    if (response.data) {
      yield put({ type: GET_TEACHER_STATISTIC_SUCCESS, payload: response.data });
    } else {
      yield put({ type: GET_TEACHER_STATISTIC_FAILURE, payload: 'No Data' })
    }
  } catch (error) {
    yield put({ type: GET_TEACHER_STATISTIC_FAILURE, payload: error })
  }
}

// Individual exports for testing
export default function* teacherDashboardPageSaga() {
  yield takeLatest(GET_TEACHER_STATISTIC, loadTeacherStatistic);
}
