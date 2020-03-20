import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the noteFolderPage state domain
 */

const selectNoteFolderPageDomain = state =>
  state.get('noteFolderPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NoteFolderPage
 */

const makeSelectNoteFolderPage = () =>
  createSelector(selectNoteFolderPageDomain, substate => substate.toJS());

export default makeSelectNoteFolderPage;
export { selectNoteFolderPageDomain };
