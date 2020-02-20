import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the highlight state domain
 */

const selectHighlightDomain = state => state.get('highlight', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Highlight
 */

const makeSelectHighlight = () =>
  createSelector(selectHighlightDomain, substate => substate.toJS());

export default makeSelectHighlight;
export { selectHighlightDomain };
