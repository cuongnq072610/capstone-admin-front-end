import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import {
  CREATE_ASK,
  CREATE_ASK_FAILURE,
  CREATE_ASK_SUCCESS,
  LOAD_STUDENT_INFO,
  LOAD_STUDENT_INFO_FAILURE,
  LOAD_STUDENT_INFO_SUCCESS,
  LOAD_FAILURE_TEACHER,
  LOAD_SUCCESS_TEACHER,
  LOAD_TEACHER,
} from './constants';
import { createNewAsk, fetchUserInfo, fetchTeacher } from './api';
import { API_ENDPOINT, CREATE_ASK_API, GET_STUDENT_INFO, ALL_TEACHER } from '../../constants/apis';

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

function* loadUserInfo() {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    let response = yield call(fetchUserInfo, `${API_ENDPOINT}${GET_STUDENT_INFO}/${user.profile}`);
    if (response.data) {
      yield put({ type: LOAD_STUDENT_INFO_SUCCESS, payload: response.data.courses })
    } else {
      yield put({ type: LOAD_STUDENT_INFO_FAILURE, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: LOAD_STUDENT_INFO_FAILURE, payload: error });
  }
}

function* LoadTeacher() {
  try {
    const response = yield call(fetchTeacher, `${API_ENDPOINT}${ALL_TEACHER}`);
    if (response.data) {
      const teachers = response.data.map(item => item)
      yield put({ type: LOAD_SUCCESS_TEACHER, payload: teachers })
    } else {
      yield put({ type: LOAD_FAILURE_TEACHER, payload: 'NO DATA' })
    }
  } catch (error) {
    yield put({ type: LOAD_FAILURE_TEACHER, payload: error })
  }
}

// Individual exports for testing
export default function* studentCreateAskPageSaga() {
  yield all([
    takeLatest(CREATE_ASK, createAsk),
    takeLatest(LOAD_STUDENT_INFO, loadUserInfo),
    takeLatest(LOAD_TEACHER, LoadTeacher),
  ])
}
