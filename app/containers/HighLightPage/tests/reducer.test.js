import { fromJS } from 'immutable';
import highLightPageReducer from '../reducer';

describe('highLightPageReducer', () => {
  it('returns the initial state', () => {
    expect(highLightPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
