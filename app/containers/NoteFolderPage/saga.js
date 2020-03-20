import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import { 
  LOAD_NOTES_BY_FOLDER, 
  LOAD_NOTES_BY_FOLDER_FAILURE, 
  LOAD_NOTES_BY_FOLDER_SUCCESS, 
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
} from './constants';
import { fetchNoteByFolder, deleteNote } from './api';
import { API_ENDPOINT, GET_NOTE_BY_FOLDER, DELETE_NOTE_BY_ID } from '../../constants/apis';

function* loadNoteByFolder(action) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { courseId } = action;
  try {
    let response = yield call(fetchNoteByFolder, `${API_ENDPOINT}${GET_NOTE_BY_FOLDER}/${user.profile}/${courseId}`);
    if(response.data) {
      let noteData = response.data.map((item, index) => {
        return item
      })
      yield put({type: LOAD_NOTES_BY_FOLDER_SUCCESS, payload: noteData});
    } else {
      yield put({type: LOAD_NOTES_BY_FOLDER_FAILURE, payload: "No Data"})
    }
  } catch (error) {
    yield put({ type: LOAD_NOTES_BY_FOLDER_FAILURE, payload: error });
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
export default function* noteFolderPageSaga() {
  yield all([
    takeLatest(LOAD_NOTES_BY_FOLDER, loadNoteByFolder),
    takeLatest(DELETE_NOTE, loadDeleteNote),
  ])
}
