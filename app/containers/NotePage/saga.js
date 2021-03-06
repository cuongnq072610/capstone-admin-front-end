import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  LOAD_NOTE,
  LOAD_SUCCESS_NOTE,
  LOAD_FAILURE_NOTE,
  DELETE_NOTE_FAILURE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE,
  LOAD_FOLDER,
  LOAD_SUCCESS_FOLDER,
  LOAD_FAILURE_FOLDER,
  SEARCH_FAILURE_NOTE,
  SEARCH_NOTE,
  SEARCH_SUCCESS_NOTE,
} from './constants';
import { fetchRecentNote, deleteNote, fetchStudentCourses } from './api';
import { API_ENDPOINT, GET_RECENT_NOTE, DELETE_NOTE_BY_ID, GET_NOTE_FOLDER, GET_SEARCH_NOTE } from '../../constants/apis';

function* loadNote() {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    let response = yield call(fetchRecentNote, `${API_ENDPOINT}${GET_RECENT_NOTE}/${user.profile}/10`);
    if (response.data) {
      let noteData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: LOAD_SUCCESS_NOTE, payload: noteData })
    } else {
      yield put({ type: LOAD_FAILURE_NOTE, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: LOAD_SUCCESS_NOTE, payload: error });
  }
}

function* loadDeleteNote(action) {
  const { id } = action;
  try {
    const response = yield call(deleteNote, `${API_ENDPOINT}${DELETE_NOTE_BY_ID}/${id}`);
    if (response.data.success) {
      yield put({ type: DELETE_NOTE_SUCCESS, payload: response.data.success });
    } else if (response.data.error) {
      yield put({ type: DELETE_NOTE_FAILURE, payload: response.data.error })
    }
  } catch (error) {
    yield put({ type: DELETE_NOTE_FAILURE, payload: error });
  }
}

function* loadCourse(action) {
  const { id } = action;
  try {
    let response = yield call(fetchStudentCourses, `${API_ENDPOINT}${GET_NOTE_FOLDER}/${id}`);
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

function* fetchSearchNote(action) {
  const { key } = action;
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const response = yield call(fetchRecentNote, `${API_ENDPOINT}${GET_SEARCH_NOTE}/?studentID=${user.profile}&folderID=all&text=${key}`);
    if (response.data) {
      let noteData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: SEARCH_SUCCESS_NOTE, payload: noteData })
    } else {
      yield put({ type: SEARCH_FAILURE_NOTE, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: SEARCH_FAILURE_NOTE, payload: error });
  }
}

// Individual exports for testing
export default function* notePageSaga() {
  yield all([
    takeLatest(LOAD_NOTE, loadNote),
    takeLatest(DELETE_NOTE, loadDeleteNote),
    takeLatest(LOAD_FOLDER, loadCourse),
    takeLatest(SEARCH_NOTE, fetchSearchNote),
  ])
}
