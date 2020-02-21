import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notePage state domain
 */

const selectNotePageDomain = state => state.get('notePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NotePage
 */

const makeSelectNotePage = () =>
  createSelector(selectNotePageDomain, substate => substate.toJS());

export default makeSelectNotePage;
export { selectNotePageDomain };
