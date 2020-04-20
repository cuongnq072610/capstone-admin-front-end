import { fromJS } from 'immutable';
import notePageReducer from '../reducer';

describe('notePageReducer', () => {
  it('returns the initial state', () => {
    expect(notePageReducer(undefined, {})).toMatchSnapshot();
  });
});
