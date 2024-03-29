import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the faqPage state domain
 */

const selectFaqPageDomain = state => state.get('faqPage', initialState);


/**
 * Other specific selectors
 */

/**
 * Default selector used by FaqPage
 */

const makeSelectFaqPage = () =>
  createSelector(selectFaqPageDomain, substate => substate.toJS());

export default makeSelectFaqPage;
export { selectFaqPageDomain };
