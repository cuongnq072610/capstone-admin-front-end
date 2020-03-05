import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentAskDetail state domain
 */

const selectStudentAskDetailDomain = state =>
  state.get('studentAskDetail', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentAskDetail
 */

const makeSelectStudentAskDetail = () =>
  createSelector(selectStudentAskDetailDomain, substate => substate.toJS());

export default makeSelectStudentAskDetail;
export { selectStudentAskDetailDomain };
