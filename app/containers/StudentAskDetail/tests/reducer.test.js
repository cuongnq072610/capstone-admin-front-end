import { fromJS } from 'immutable';
import studentAskDetailReducer from '../reducer';

describe('studentAskDetailReducer', () => {
  it('returns the initial state', () => {
    expect(studentAskDetailReducer(undefined, {})).toEqual(fromJS({}));
  });
});
