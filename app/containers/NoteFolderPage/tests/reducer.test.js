import { fromJS } from 'immutable';
import noteFolderPageReducer from '../reducer';

describe('noteFolderPageReducer', () => {
  it('returns the initial state', () => {
    expect(noteFolderPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
