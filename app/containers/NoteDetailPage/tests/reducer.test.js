import { fromJS } from 'immutable';
import noteDetailPageReducer from '../reducer';

describe('noteDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(noteDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
