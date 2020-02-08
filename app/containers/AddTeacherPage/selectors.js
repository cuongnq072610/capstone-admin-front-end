import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addTeacherPage state domain
 */

const selectAddTeacherPageDomain = state =>
  state.get('addTeacherPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddTeacherPage
 */

const makeSelectAddTeacherPage = () =>
  createSelector(selectAddTeacherPageDomain, substate => substate.toJS());

export default makeSelectAddTeacherPage;
export { selectAddTeacherPageDomain };
