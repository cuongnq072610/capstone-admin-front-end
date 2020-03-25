import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import { 
  LOAD_HIGHLIGHT, 
  LOAD_HIGHLIGHT_FAILURE, 
  LOAD_HIGHLIGHT_SUCCESS,
  LOAD_FOLDER, 
  LOAD_FAILURE_FOLDER, 
  LOAD_SUCCESS_FOLDER, 
  DELETE_HIGHLIGHT, 
  DELETE_HIGHLIGHT_FAILURE, 
  DELETE_HIGHLIGHT_SUCCESS,
} from './constants';
import { fetchHighlight, fetchStudentCourses, deleteHighlight } from './api';
import { API_ENDPOINT, GET_STUDENT_INFO, GET_RECENT_HIGHLIGHT, DELETE_HIGHLIGHT_BY_ID, GET_HIGHLIGHT_FOLDER } from '../../constants/apis';

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
    let response = yield call(fetchStudentCourses, `${API_ENDPOINT}${GET_HIGHLIGHT_FOLDER}/${id}`);
    if (response.data) {
      let courses = response.data.map(course => course);
      yield put({ type: LOAD_SUCCESS_FOLDER, payload: courses })
    } else {
      yield put({ type: LOAD_FAILURE_FOLDER, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: LOAD_FAILURE_FOLDER, payload: error });
  }
}

function* loadDeleteHighlight(action) {
  const { id } = action;
  try {
    const response = yield call(deleteHighlight, `${API_ENDPOINT}${DELETE_HIGHLIGHT_BY_ID}/${id}`);
    if (response.data.success) {
      yield put({ type: DELETE_HIGHLIGHT_SUCCESS, payload: response.data.success });
    } else if (response.data.error) {
      yield put({ type: DELETE_HIGHLIGHT_FAILURE, payload: response.data.error })
    }
  } catch (error) {
    yield put({ type: DELETE_HIGHLIGHT_FAILURE, payload: error });
  }
}

// Individual exports for testing
export default function* highLightPageSaga() {
  yield all([
    takeLatest(LOAD_HIGHLIGHT, getAllHighlight),
    takeLatest(LOAD_FOLDER, loadCourse),
    takeLatest(DELETE_HIGHLIGHT, loadDeleteHighlight),
  ])
}
