import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import { ADD_COURSE, ADD_COURSE_FAILURE, ADD_COURSE_SUCCESS, UPDATE_COURSE, UPDATE_COURSE_SUCCESS, UPDATE_COURSE_FAILURE } from './constants';
import { addCourseApi, updateCourseApi } from './api';
import { API_ENDPOINT, CREATE_COURSE, UPDATE_COURSES } from '../../constants/apis';

function* addCourse(action) {
  try {
    const response = yield call(addCourseApi, `${API_ENDPOINT}${CREATE_COURSE}`, action.course)
    if (response.data) {
      yield put({ type: ADD_COURSE_SUCCESS, payload: response.data.message })
    } else {
      yield put({ type: ADD_COURSE_FAILURE, payload: response.data.message })

    }
  } catch (error) {
    yield put({ type: ADD_COURSE_FAILURE, payload: error });
  }
}

function* updateCourse(action) {
  try {
    const response = yield call(updateCourseApi, `${API_ENDPOINT}${UPDATE_COURSES}/${action.course._id}`, action.course)
    if (response.data) {
      yield put({ type: UPDATE_COURSE_SUCCESS, payload: response.data.message })
    } else {
      yield put({ type: UPDATE_COURSE_FAILURE, payload: response.data.message })
    }
  } catch (error) {
    console.log(error)
    yield put({ type: UPDATE_COURSE_FAILURE, payload: error })
  }
}

// Individual exports for testing
export default function* addCoursePageSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeLatest(ADD_COURSE, addCourse),
    takeLatest(UPDATE_COURSE, updateCourse),
  ]);
}
