import { fromJS } from 'immutable';
import studentAskPageReducer from '../reducer';

describe('studentAskPageReducer', () => {
  it('returns the initial state', () => {
    expect(studentAskPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
