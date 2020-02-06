import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the teacherPage state domain
 */

const selectTeacherPageDomain = state => state.get('teacherPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by TeacherPage
 */

const makeSelectTeacherPage = () =>
  createSelector(selectTeacherPageDomain, substate => substate.toJS());

export default makeSelectTeacherPage;
export { selectTeacherPageDomain };
