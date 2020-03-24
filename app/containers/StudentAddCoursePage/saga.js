import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import { LOAD_COURSE, SEARCH_COURSE, LOAD_SUCCESS_COURSE, LOAD_FAILURE_COURSE, SEARCH_SUCCESS_COURSE, SEARCH_FAILURE_COURSE, UPDATE_COURSE, UPDATE_FAILURE_COURSE, UPDATE_SUCCESS_COURSE } from './constants';
import { API_ENDPOINT, ALL_COURSE, SEARCH_COURSES, UPDATE_STUDENT_COURSE } from '../../constants/apis';
import { fetchCourse, updateCourse } from './api';

function* loadCourse() {
  try {
    const response = yield call(fetchCourse, `${API_ENDPOINT}${ALL_COURSE}`);
    if (response.data) {
      let coursesData = response.data.map(item => item);
      yield put({ type: LOAD_SUCCESS_COURSE, payload: coursesData });
    } else {
      yield put({ type: LOAD_FAILURE_COURSE, payload: 'No Data' });
    }
  } catch (error) {
    yield put({ type: LOAD_FAILURE_COURSE, payload: error });
  }
}

function* fetchSearchCourse(action) {
  try {
    const response = yield call(fetchCourse, `${API_ENDPOINT}${SEARCH_COURSES}?page=0&limit=1&detail=${action.key}`);
    if (response.data) {
      let courseData = response.data.result.map((item, index) => {
        return item
      })
      yield put({ type: SEARCH_SUCCESS_COURSE, payload: courseData })
    } else {
      yield put({ type: SEARCH_FAILURE_COURSE, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: SEARCH_FAILURE_COURSE, payload: error });
  }
}

function* updateStudentCourse(action) {
  const { courses, id } = action;
  try {
    const response = yield call(updateCourse, `${API_ENDPOINT}${UPDATE_STUDENT_COURSE}/${id}`, courses);
    if (response.data.success) {
      yield put({ type: UPDATE_SUCCESS_COURSE, payload: response.data.success })
    } else if (response.data.error) {
      yield put({ type: UPDATE_FAILURE_COURSE, payload: response.data.error })
    }
  } catch (error) {
    yield put({ type: UPDATE_FAILURE_COURSE, payload: error })
  }
}

// Individual exports for testing
export default function* studentAddCoursePageSaga() {
  yield all([
    takeLatest(LOAD_COURSE, loadCourse),
    takeLatest(SEARCH_COURSE, fetchSearchCourse),
    takeLatest(UPDATE_COURSE, updateStudentCourse),
  ]);
}
