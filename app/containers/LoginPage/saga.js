import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from './constants';
import { loginService } from './api';
import { API_ENDPOINT, LOGIN_API } from '../../constants/apis';

function* handleLogin(action) {
  const { email, password } = action;
  try {
    let response = yield call(loginService, `${API_ENDPOINT}${LOGIN_API}`, { email, password });
    if (response.data.error) {
      yield put({ type: LOGIN_FAILURE, payload: response.data.error })
    } else {
      yield put({ type: LOGIN_SUCCESS, payload: response.data.token })
      localStorage.setItem("token", response.data.token);
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: "Username or Password is incorrect" });
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  yield takeLatest(LOGIN, handleLogin)
}
