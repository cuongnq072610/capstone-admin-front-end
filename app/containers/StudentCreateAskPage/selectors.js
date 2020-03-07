import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentCreateAskPage state domain
 */

const selectStudentCreateAskPageDomain = state =>
  state.get('studentCreateAskPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentCreateAskPage
 */

const makeSelectStudentCreateAskPage = () =>
  createSelector(selectStudentCreateAskPageDomain, substate => substate.toJS());

export default makeSelectStudentCreateAskPage;
export { selectStudentCreateAskPageDomain };
