import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import { LOAD_FOLDER, LOAD_NOTE, LOAD_SUCCESS_FOLDER, LOAD_FAILURE_FOLDER, LOAD_SUCCESS_NOTE, LOAD_FAILURE_NOTE } from './constants';

function* loadFolder() {
  try {
    let response = yield call("")
    if (response.data.entries) {
      let folderData = response.data.entries.map((item, index) => {
        return item
      })
      yield put({ type: LOAD_SUCCESS_FOLDER, payload: folderData })
    } else {
      yield put({ type: LOAD_FAILURE_FOLDER, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: LOAD_SUCCESS_FOLDER, payload: error });
  }
}

function* loadNote() {
  try {
    let response = yield call("")
    if (response.data.entries) {
      let noteData = response.data.entries.map((item, index) => {
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

// Individual exports for testing
export default function* notePageSaga() {
  yield all([
    takeLatest(LOAD_FOLDER, loadFolder),
    takeLatest(LOAD_NOTE, loadNote)
  ])
}
