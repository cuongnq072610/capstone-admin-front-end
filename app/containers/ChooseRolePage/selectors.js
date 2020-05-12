import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chooseRolePage state domain
 */

const selectChooseRolePageDomain = state =>
  state.get('chooseRolePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChooseRolePage
 */

const makeSelectChooseRolePage = () =>
  createSelector(selectChooseRolePageDomain, substate => substate.toJS());

export default makeSelectChooseRolePage;
export { selectChooseRolePageDomain };
