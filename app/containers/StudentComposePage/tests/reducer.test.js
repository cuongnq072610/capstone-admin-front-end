import { fromJS } from 'immutable';
import studentComposePageReducer from '../reducer';

describe('studentComposePageReducer', () => {
  it('returns the initial state', () => {
    expect(studentComposePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
