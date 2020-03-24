import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentDashboardPage state domain
 */

const selectStudentDashboardPageDomain = state =>
  state.get('studentDashboardPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentDashboardPage
 */

const makeSelectStudentDashboardPage = () =>
  createSelector(selectStudentDashboardPageDomain, substate => substate.toJS());

export default makeSelectStudentDashboardPage;
export { selectStudentDashboardPageDomain };
