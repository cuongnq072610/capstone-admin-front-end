import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from './constants';
import { loginService } from './api';
import { API_ENDPOINT, LOGIN_API } from '../../constants/apis';
import history from '../../utils/history';
import parseJwt from '../../utils/parseJWT';

function* handleLogin(action) {
  const { email, password } = action;
  console.log(email + "--" + password)
  try {
    let response = yield call(loginService, `${API_ENDPOINT}${LOGIN_API}`, { email, password });
    if (response.data.err) {
      yield put({ type: LOGIN_FAILURE, payload: response.data.err })
    } else {
      yield put({ type: LOGIN_SUCCESS, payload: response.data.token })
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error })
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  yield takeLatest(LOGIN, handleLogin)
}
