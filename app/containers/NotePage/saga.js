import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  LOAD_FOLDER,
  LOAD_NOTE,
  LOAD_SUCCESS_FOLDER,
  LOAD_FAILURE_FOLDER,
  LOAD_SUCCESS_NOTE,
  LOAD_FAILURE_NOTE,
  CREATE_FOLDER,
  CREATE_FAILURE_FOLDER,
  CREATE_SUCCESS_FOLDER,
} from './constants';
import { fetchAllNote, fetchAllFolder, createFolder } from './api';
import { API_ENDPOINT, GET_ALL_NOTE, GET_ALL_FOLDER, CREATE_NEW_FOLDER } from '../../constants/apis';

function* loadFolder() {
  try {
    let response = yield call(fetchAllFolder, `${API_ENDPOINT}${GET_ALL_FOLDER}`);
    if (response.data) {
      let folderData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: LOAD_SUCCESS_FOLDER, payload: folderData })
    } else {
      yield put({ type: LOAD_FAILURE_FOLDER, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: LOAD_FAILURE_FOLDER, payload: error });
  }
}

function* loadNote() {
  try {
    let response = yield call(fetchAllNote, `${API_ENDPOINT}${GET_ALL_NOTE}`);
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

function* createNewFolder(action) {
  try {
    let response = yield call(createFolder, `${API_ENDPOINT}${CREATE_NEW_FOLDER}`, action.body)
    if (response.data) {
      if (response.data.Error) {
        yield put({ type: CREATE_FAILURE_FOLDER, payload: response.data });
      } else {
        yield put({ type: CREATE_SUCCESS_FOLDER, payload: response.data });
      }
    } else {
      yield put({ type: CREATE_FAILURE_FOLDER, payload: { errors: 'NO DATA' } });
    }
  } catch (error) {
    yield put({ type: CREATE_FAILURE_FOLDER, payload: error });
  }
}

// Individual exports for testing
export default function* notePageSaga() {
  yield all([
    takeLatest(LOAD_FOLDER, loadFolder),
    takeLatest(LOAD_NOTE, loadNote),
    takeLatest(CREATE_FOLDER, createNewFolder),
  ])
}
