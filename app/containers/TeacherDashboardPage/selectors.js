import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the teacherDashboardPage state domain
 */

const selectTeacherDashboardPageDomain = state =>
  state.get('teacherDashboardPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TeacherDashboardPage
 */

const makeSelectTeacherDashboardPage = () =>
  createSelector(selectTeacherDashboardPageDomain, substate => substate.toJS());

export default makeSelectTeacherDashboardPage;
export { selectTeacherDashboardPageDomain };
