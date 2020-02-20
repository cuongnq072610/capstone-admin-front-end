import { fromJS } from 'immutable';
import highlightReducer from '../reducer';

describe('highlightReducer', () => {
  it('returns the initial state', () => {
    expect(highlightReducer(undefined, {})).toEqual(fromJS({}));
  });
});
