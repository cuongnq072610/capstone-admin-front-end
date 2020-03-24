import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the departmentPage state domain
 */

const selectDepartmentPageDomain = state =>
  state.get('departmentPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DepartmentPage
 */

const makeSelectDepartmentPage = () =>
  createSelector(selectDepartmentPageDomain, substate => substate.toJS());

export default makeSelectDepartmentPage;
export { selectDepartmentPageDomain };
