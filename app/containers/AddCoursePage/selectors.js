import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addCoursePage state domain
 */

const selectAddCoursePageDomain = state =>
  state.get('addCoursePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddCoursePage
 */

const makeSelectAddCoursePage = () =>
  createSelector(selectAddCoursePageDomain, substate => substate.toJS());

export default makeSelectAddCoursePage;
export { selectAddCoursePageDomain };
