import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  ADD_COURSE,
  ADD_COURSE_FAILURE,
  ADD_COURSE_SUCCESS,
  UPDATE_COURSE,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAILURE,
  LOAD_SUCCESS_DEPARTMENT,
  LOAD_FAILURE_DEPARTMENT,
  LOAD_DEPARTMENT
} from './constants';
import { addCourseApi, updateCourseApi, fetchDepartment } from './api';
import { API_ENDPOINT, CREATE_COURSE, UPDATE_COURSES, GET_ALL_DEPARTMENT } from '../../constants/apis';

function* addCourse(action) {
  try {
    const response = yield call(addCourseApi, `${API_ENDPOINT}${CREATE_COURSE}`, action.course)
    if (response.data.success) {
      yield put({ type: ADD_COURSE_SUCCESS, payload: response.data.success })
    } else if (response.data.error) {
      yield put({ type: ADD_COURSE_FAILURE, payload: response.data.error })

    }
  } catch (error) {
    yield put({ type: ADD_COURSE_FAILURE, payload: error });
  }
}

function* updateCourse(action) {
  try {
    const response = yield call(updateCourseApi, `${API_ENDPOINT}${UPDATE_COURSES}/${action.course._id}`, action.course)
    if (response.data.success) {
      yield put({ type: UPDATE_COURSE_SUCCESS, payload: response.data.message })
    } else if (response.data.error) {
      yield put({ type: UPDATE_COURSE_FAILURE, payload: response.data.error })
    }
  } catch (error) {
    yield put({ type: UPDATE_COURSE_FAILURE, payload: { msg: error } })
  }
}

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

// Individual exports for testing
export default function* addCoursePageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(ADD_COURSE, addCourse),
    takeLatest(UPDATE_COURSE, updateCourse),
    takeLatest(LOAD_DEPARTMENT, loadDepartment),
  ]);
}
