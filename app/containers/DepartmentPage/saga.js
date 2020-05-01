import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import { fetchDepartment, createNewDepartment, deleteOldDepartment, updateNewDepartment } from './api';
import { API_ENDPOINT, GET_ALL_DEPARTMENT, CREATE_DEPARTMENT, DELETE_DEPARTMENT, UPDATE_DEPARTMENT, SEARCH_DEPARTMENTS } from '../../constants/apis';
import {
  LOAD_SUCCESS_DEPARTMENT,
  LOAD_FAILURE_DEPARTMENT,
  LOAD_DEPARTMENT,
  LOAD_CREATE_DEPARTMENT,
  LOAD_CREATE_FAILURE_DEPARTMENT,
  LOAD_CREATE_SUCCESS_DEPARTMENT,
  LOAD_DELETE_DEPARTMENT,
  LOAD_DELETE_FAILURE_DEPARTMENT,
  LOAD_DELETE_SUCCESS_DEPARTMENT,
  LOAD_UPDATE_SUCCESS_DEPARTMENT,
  LOAD_UPDATE_FAILURE_DEPARTMENT,
  LOAD_UPDATE_DEPARTMENT,
  SEARCH_SUCCESS_DEPARTMENT,
  SEARCH_DEPARTMENT,
  SEARCH_FAILURE_DEPARTMENT,
} from './constants';

function* loadDepartment() {
  try {
    let response = yield call(fetchDepartment, `${API_ENDPOINT}${GET_ALL_DEPARTMENT}`);
    if (response.data) {
      let departmentData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: LOAD_SUCCESS_DEPARTMENT, payload: departmentData })
    } else {
      yield put({ type: LOAD_FAILURE_DEPARTMENT, payload: "NO DATA" })
    }
  } catch (err) {
    yield put({ type: LOAD_FAILURE_DEPARTMENT, payload: err })
  }
}

function* deleteDepartment(action) {
  const { id } = action;
  try {
    let response = yield call(deleteOldDepartment, `${API_ENDPOINT}${DELETE_DEPARTMENT}/${id}`);
    if (response.data.success) {
      yield put({ type: LOAD_DELETE_SUCCESS_DEPARTMENT, payload: response.data.success })
    } else if (response.data.error) {
      yield put({ type: LOAD_DELETE_FAILURE_DEPARTMENT, payload: response.data.error })
    }
  } catch (error) {
    yield put({ type: LOAD_DELETE_FAILURE_DEPARTMENT, payload: error });
  }
}

function* addDepartment(action) {
  const { department } = action;
  try {
    let response = yield call(createNewDepartment, `${API_ENDPOINT}${CREATE_DEPARTMENT}`, department)
    if (response.data.success) {
      yield put({ type: LOAD_CREATE_SUCCESS_DEPARTMENT, payload: response.data.success });
    } else if (response.data.error) {
      yield put({ type: LOAD_CREATE_FAILURE_DEPARTMENT, payload: response.data.error })
    }
  } catch (error) {
    yield put({ type: LOAD_CREATE_FAILURE_DEPARTMENT, payload: error })
  }
}

function* updateDepartment(action) {
  const { department, id } = action;
  try {
    let response = yield call(updateNewDepartment, `${API_ENDPOINT}${UPDATE_DEPARTMENT}/${id}`, department)
    if (response.data.success) {
      yield put({ type: LOAD_UPDATE_SUCCESS_DEPARTMENT, payload: response.data.success });
    } else if (response.data.error) {
      yield put({ type: LOAD_UPDATE_FAILURE_DEPARTMENT, payload: response.data.error })
    }
  } catch (error) {
    yield put({ type: LOAD_UPDATE_FAILURE_DEPARTMENT, payload: error })
  }
}

function* fetchSearchDepartment(action) {
  try {
    const response = yield call(fetchDepartment, `${API_ENDPOINT}${SEARCH_DEPARTMENTS}/?text=${action.key}`);
    if (response.data) {
      let departmentData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: SEARCH_SUCCESS_DEPARTMENT, payload: departmentData })
    } else {
      yield put({ type: SEARCH_FAILURE_DEPARTMENT, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: SEARCH_FAILURE_DEPARTMENT, payload: error });
  }
}

// Individual exports for testing
export default function* departmentPageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(LOAD_DEPARTMENT, loadDepartment),
    takeLatest(LOAD_DELETE_DEPARTMENT, deleteDepartment),
    takeLatest(LOAD_CREATE_DEPARTMENT, addDepartment),
    takeLatest(LOAD_UPDATE_DEPARTMENT, updateDepartment),
    takeLatest(SEARCH_DEPARTMENT, fetchSearchDepartment),
  ])
}
