import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from './constants';
import { loginService } from './api';
import { API_ENDPOINT, LOGIN_API } from '../../constants/apis';

function* handleLogin(action) {
  const { email, password } = action;
  console.log(email + "--" + password)
  try {
    let response = yield call(loginService, `${API_ENDPOINT}${LOGIN_API}`, { email, password });
    if (response.data.err) {
      yield put({ type: LOGIN_FAILURE, payload: response.data.err })
    } else {
      yield put({ type: LOGIN_SUCCESS, payload: response.data.token })
      localStorage.setItem("token", response.data.token);
      const parseToken = parseJwt(response.data.token);
      const user = JSON.stringify(parseToken.user);
      localStorage.setItem('user', user);
      switch (JSON.parse(user).role) {
        case 'admin':
          history.push('/admin');
          break;
        case 'teacher':
          history.push('/teacher');
          break;
        default:
          break;
      }
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error })
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  yield takeLatest(LOGIN, handleLogin)
}
