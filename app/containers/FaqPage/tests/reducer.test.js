import { fromJS } from 'immutable';
import faqPageReducer from '../reducer';

describe('faqPageReducer', () => {
  it('returns the initial state', () => {
    expect(faqPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
