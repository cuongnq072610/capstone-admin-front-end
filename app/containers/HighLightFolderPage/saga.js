import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import {
  LOAD__HIGHLIGHT_BY_FOLDER,
  DELETE_HIGHLIGHT,
  LOAD__HIGHLIGHT_BY_FOLDER_SUCCESS,
  LOAD__HIGHLIGHT_BY_FOLDER_FAILURE,
  DELETE_HIGHLIGHT_FAILURE,
  DELETE_HIGHLIGHT_SUCCESS,
  FILTER_HIGHLIGHT,
  FILTER_HIGHLIGHT_SUCCESS,
  FILTER_HIGHLIGHT_FAILURE,
  SEARCH_HIGHLIGHT,
  SEARCH_SUCCESS_HIGHLIGHT,
  SEARCH_FAILURE_HIGHLIGHT,
} from './constants';
import { 
  API_ENDPOINT, 
  GET_HIGHLIGHT_BY_FOLDER, 
  DELETE_HIGHLIGHT_BY_ID, 
  GET_HIGHLIGHT_BY_COLOR,
  GET_SEARCH_HIGHLIGHT, 
} from '../../constants/apis';
import { fetchHighlightByFolder, deleteHighlight, fetchHighlightByColor } from './api';

function* loadHighlightByFolder(action) {
  const { courseId } = action;
  try {
    let response = yield call(fetchHighlightByFolder, `${API_ENDPOINT}${GET_HIGHLIGHT_BY_FOLDER}/${courseId}`);
    if (response.data) {
      let highlightData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: LOAD__HIGHLIGHT_BY_FOLDER_SUCCESS, payload: highlightData });
    } else {
      yield put({ type: LOAD__HIGHLIGHT_BY_FOLDER_FAILURE, payload: "No Data" })
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

function* filterByColor(action) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { courseId, color } = action;
  try {
    let response = yield call(fetchHighlightByColor, `${API_ENDPOINT}${GET_HIGHLIGHT_BY_COLOR}/${user.profile}/${courseId}/${color}`);
    if (response.data) {
      let highlightData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: FILTER_HIGHLIGHT_SUCCESS, payload: highlightData });
    } else {
      yield put({ type: FILTER_HIGHLIGHT_FAILURE, payload: "No Data" })
    }
  } catch (error) {
    yield put({ type: FILTER_HIGHLIGHT_FAILURE, payload: error });
  }
}

function* fetchSearchHighlight(action) {
  const { key, id } = action;
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const response = yield call(fetchHighlightByFolder, `${API_ENDPOINT}${GET_SEARCH_HIGHLIGHT}/${user.profile}/${id}/${key}`);
    if (response.data) {
      let highlightData = response.data.map((item, index) => {
        return item
      })
      yield put({ type: SEARCH_SUCCESS_HIGHLIGHT, payload: highlightData })
    } else {
      yield put({ type: SEARCH_FAILURE_HIGHLIGHT, payload: "NO DATA" })
    }
  } catch (error) {
    yield put({ type: SEARCH_FAILURE_HIGHLIGHT, payload: error });
  }
}

// Individual exports for testing
export default function* highLightFolderPageSaga() {
  yield all([
    takeLatest(LOAD__HIGHLIGHT_BY_FOLDER, loadHighlightByFolder),
    takeLatest(DELETE_HIGHLIGHT, loadDeleteHighlight),
    takeLatest(FILTER_HIGHLIGHT, filterByColor),
    takeLatest(SEARCH_HIGHLIGHT, fetchSearchHighlight),
  ])
}
