import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import { 
  LOAD__HIGHLIGHT_BY_FOLDER, 
  DELETE_HIGHLIGHT, 
  LOAD__HIGHLIGHT_BY_FOLDER_SUCCESS,
  LOAD__HIGHLIGHT_BY_FOLDER_FAILURE,
  DELETE_HIGHLIGHT_FAILURE, 
  DELETE_HIGHLIGHT_SUCCESS,
} from './constants';
import { API_ENDPOINT, GET_HIGHLIGHT_BY_FOLDER, DELETE_HIGHLIGHT_BY_ID } from '../../constants/apis';
import { fetchHighlightByFolder, deleteHighlight } from './api';

function* loadHighlightByFolder(action) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { courseId } = action;
  try {
    let response = yield call(fetchHighlightByFolder, `${API_ENDPOINT}${GET_HIGHLIGHT_BY_FOLDER}/${user.profile}/${courseId}`);
    if(response.data) {
      let highlightData = response.data.map((item, index) => {
        return item
      })
      yield put({type: LOAD__HIGHLIGHT_BY_FOLDER_SUCCESS, payload: highlightData});
    } else {
      yield put({type: LOAD__HIGHLIGHT_BY_FOLDER_FAILURE, payload: "No Data"})
    }
  } catch (error) {
    yield put({ type: LOAD__HIGHLIGHT_BY_FOLDER_FAILURE, payload: error });
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
export default function* highLightFolderPageSaga() {
  yield all([
    takeLatest(LOAD__HIGHLIGHT_BY_FOLDER, loadHighlightByFolder),
    takeLatest(DELETE_HIGHLIGHT, loadDeleteHighlight),
  ])
}
