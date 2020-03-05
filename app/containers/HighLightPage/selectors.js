import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the highLightPage state domain
 */

const selectHighLightPageDomain = state =>
  state.get('highLightPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HighLightPage
 */

const makeSelectHighLightPage = () =>
  createSelector(selectHighLightPageDomain, substate => substate.toJS());

export default makeSelectHighLightPage;
export { selectHighLightPageDomain };
