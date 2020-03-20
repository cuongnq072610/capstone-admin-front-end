import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the highLightFolderPage state domain
 */

const selectHighLightFolderPageDomain = state =>
  state.get('highLightFolderPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by HighLightFolderPage
 */

const makeSelectHighLightFolderPage = () =>
  createSelector(selectHighLightFolderPageDomain, substate => substate.toJS());

export default makeSelectHighLightFolderPage;
export { selectHighLightFolderPageDomain };
