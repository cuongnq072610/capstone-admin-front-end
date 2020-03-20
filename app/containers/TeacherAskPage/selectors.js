import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentAskPage state domain
 */

const selectStudentAskPageDomain = state =>
  state.get('studentAskPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentAskPage
 */

const makeSelectStudentAskPage = () =>
  createSelector(selectStudentAskPageDomain, substate => substate.toJS());

export default makeSelectStudentAskPage;
export { selectStudentAskPageDomain };
