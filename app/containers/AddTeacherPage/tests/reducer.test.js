import { fromJS } from 'immutable';
import addTeacherPageReducer from '../reducer';

describe('addTeacherPageReducer', () => {
  it('returns the initial state', () => {
    expect(addTeacherPageReducer(undefined, {})).toEqual(fromJS({
      isLoading: false,
      teachers: [],
      error: ''
    }));
  });
});
