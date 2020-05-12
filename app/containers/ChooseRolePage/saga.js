import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { CHOOSE_ROLE, CHOOSE_ROLE_SUCCESS, CHOOSE_ROLE_FAILURE } from './constants';
import { } from './api';
import { API_ENDPOINT } from '../../constants/apis';

function* loadChooseRole(action) {
  const { role } = action;
  console.log(role);
}

// Individual exports for testing
export default function* chooseRolePageSaga() {
  yield takeLatest(CHOOSE_ROLE, loadChooseRole);
}
