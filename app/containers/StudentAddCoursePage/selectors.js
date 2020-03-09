import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the studentAddCoursePage state domain
 */

const selectStudentAddCoursePageDomain = state =>
  state.get('studentAddCoursePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by StudentAddCoursePage
 */

const makeSelectStudentAddCoursePage = () =>
  createSelector(selectStudentAddCoursePageDomain, substate => substate.toJS());

export default makeSelectStudentAddCoursePage;
export { selectStudentAddCoursePageDomain };
