import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentComposePage state domain
 */

const selectStudentComposePageDomain = state =>
  state.get('studentComposePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentComposePage
 */

const makeSelectStudentComposePage = () =>
  createSelector(selectStudentComposePageDomain, substate => substate.toJS());

export default makeSelectStudentComposePage;
export { selectStudentComposePageDomain };
