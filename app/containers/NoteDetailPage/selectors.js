import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the noteDetailPage state domain
 */

const selectNoteDetailPageDomain = state =>
  state.get('noteDetailPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NoteDetailPage
 */

const makeSelectNoteDetailPage = () =>
  createSelector(selectNoteDetailPageDomain, substate => substate.toJS());

export default makeSelectNoteDetailPage;
export { selectNoteDetailPageDomain };
