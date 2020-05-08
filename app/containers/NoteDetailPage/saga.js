import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import { LOAD_NOTE, LOAD_NOTE_SUCCESS, LOAD_NOTE_FAILURE, UPDATE_NOTE_FAILURE, UPDATE_NOTE_SUCCESS, UPDATE_NOTE, DELETE_NOTE_FAILURE, DELETE_NOTE_SUCCESS, DELETE_NOTE } from './constants';
import { fetchNote, updateNote, deleteNote } from './api';
import { API_ENDPOINT, GET_NOTE_BY_ID, UPDATE_NOTE_BY_ID, DELETE_NOTE_BY_ID } from '../../constants/apis';

function* loadNoteDetail(action) {
  const { id } = action;
  try {
    const response = yield call(fetchNote, `${API_ENDPOINT}${GET_NOTE_BY_ID}/${id}`);
    if (response.data) {
      yield put({ type: LOAD_NOTE_SUCCESS, payload: response.data });
    } else {
      yield put({ type: LOAD_NOTE_FAILURE, payload: "NO DATA" });
    }
  } catch (error) {
    yield put({ type: LOAD_NOTE_FAILURE, payload: error });
  }
}

function* loadSaveNote(action) {
  const { note, id } = action;
  try {
    const response = yield call(updateNote, `${API_ENDPOINT}${UPDATE_NOTE_BY_ID}/${id}`, note);
    if (response.data.success) {
      yield put({ type: UPDATE_NOTE_SUCCESS, payload: response.data.success, note: response.data.note });
    } else if (response.data.error) {
      yield put({ type: UPDATE_NOTE_FAILURE, payload: response.data.error })
    }
  } catch (error) {
    yield put({ type: UPDATE_NOTE_FAILURE, payload: "Server Error" })
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

// Individual exports for testing
export default function* noteDetailPageSaga() {
  yield all([
    takeLatest(LOAD_NOTE, loadNoteDetail),
    takeLatest(UPDATE_NOTE, loadSaveNote),
    takeLatest(DELETE_NOTE, loadDeleteNote),
  ])
}
