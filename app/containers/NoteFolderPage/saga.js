import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import { LOAD_NOTES_BY_FOLDER, LOAD_NOTES_BY_FOLDER_FAILURE, LOAD_NOTES_BY_FOLDER_SUCCESS } from './constants';
import { fetchNoteByFolder } from './api';
import { API_ENDPOINT, GET_NOTE_BY_FOLDER } from '../../constants/apis';

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

// Individual exports for testing
export default function* noteFolderPageSaga() {
  yield all([
    takeLatest(LOAD_NOTES_BY_FOLDER, loadNoteByFolder),
  ])
}
