import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import { 
  LOAD_HIGHLIGHT, 
  LOAD_HIGHLIGHT_FAILURE, 
  LOAD_HIGHLIGHT_SUCCESS,
  LOAD_COURSE, 
  LOAD_FAILURE_COURSE, 
  LOAD_SUCCESS_COURSE, 
} from './constants';
import { fetchHighlight, fetchStudentCourses } from './api';
import { API_ENDPOINT, GET_STUDENT_INFO, GET_RECENT_HIGHLIGHT } from '../../constants/apis';

function* getAllHighlight() {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const response = yield call(fetchHighlight, `${API_ENDPOINT}${GET_RECENT_HIGHLIGHT}/${user.profile}/10`);
    if (response.data) {
      let highlightData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: LOAD_HIGHLIGHT_SUCCESS, payload: highlightData });
    } else {
      yield put({ type: LOAD_HIGHLIGHT_FAILURE, payload: { msg: "NO_DATA" } });
    }
  } catch (error) {
    yield put({ type: LOAD_HIGHLIGHT_FAILURE, payload: error });
  }
}

function* loadCourse(action) {
  const { id } = action;
  try {
    let response = yield call(fetchStudentCourses, `${API_ENDPOINT}${GET_STUDENT_INFO}/${id}`);
    console.log(response)
    if (response.data) {
      let courses = response.data.courses.map(course => course);
      yield put({ type: LOAD_SUCCESS_COURSE, payload: courses })
    } else {
      yield put({ type: LOAD_FAILURE_COURSE, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: LOAD_FAILURE_COURSE, payload: error });
  }
}

// Individual exports for testing
export default function* highLightPageSaga() {
  yield all([
    takeLatest(LOAD_HIGHLIGHT, getAllHighlight),
    takeLatest(LOAD_COURSE, loadCourse),
  ])
}
