import { fromJS } from 'immutable';
import studentCreateAskPageReducer from '../reducer';

describe('studentCreateAskPageReducer', () => {
  it('returns the initial state', () => {
    expect(studentCreateAskPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
