import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { CHOOSE_ROLE, CHOOSE_ROLE_SUCCESS, CHOOSE_ROLE_FAILURE } from './constants';
import { fetchChooseRole } from './api';
import { API_ENDPOINT, CHOOSE_ROLE_API } from '../../constants/apis';

function* loadChooseRole(action) {
  const { role, email } = action;
  try {
    let response = yield call(fetchChooseRole, `${API_ENDPOINT}${CHOOSE_ROLE_API}`, { "role": role, "email": email });
    console.log(response)
    if (response.data.error) {
      yield put({ type: CHOOSE_ROLE_FAILURE, payload: response.data.error })
    } else if (response.status === 200) {
      yield put({ type: CHOOSE_ROLE_SUCCESS })
    }
  } catch (error) {
    yield put({ type: CHOOSE_ROLE_FAILURE, payload: "Server error" })
  }
}

// Individual exports for testing
export default function* chooseRolePageSaga() {
  yield takeLatest(CHOOSE_ROLE, loadChooseRole);
}
