import { take, call, put, select, takeLatest, all } from 'redux-saga/effects';
import {
  LOAD_NOTE,
  LOAD_SUCCESS_NOTE,
  LOAD_FAILURE_NOTE,
  DELETE_NOTE_FAILURE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE,
} from './constants';
import { fetchAllNote, deleteNote } from './api';
import { API_ENDPOINT, GET_ALL_NOTE, DELETE_NOTE_BY_ID } from '../../constants/apis';

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

function* loadDeleteNote(action) {
  const { id } = action;
  try {
    const response = yield call(deleteNote, `${API_ENDPOINT}${DELETE_NOTE_BY_ID}/${id}`);
    if (response.data.Sucess) {
      yield put({ type: DELETE_NOTE_SUCCESS, payload: response.data.Sucess });
    } else if (response.data.Error) {
      yield put({ type: DELETE_NOTE_FAILURE, payload: response.data.Error })
    }
  } catch (error) {
    yield put({ type: DELETE_NOTE_FAILURE, payload: error });
  }
}

// Individual exports for testing
export default function* notePageSaga() {
  yield all([
    takeLatest(LOAD_NOTE, loadNote),
    takeLatest(DELETE_NOTE, loadDeleteNote),
  ])
}
