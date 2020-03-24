import { fromJS } from 'immutable';
import highLightFolderPageReducer from '../reducer';

describe('highLightFolderPageReducer', () => {
  it('returns the initial state', () => {
    expect(highLightFolderPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
