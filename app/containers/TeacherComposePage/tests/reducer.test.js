import { fromJS } from 'immutable';
import studentComposePageReducer from '../reducer';

describe('studentComposePageReducer', () => {
  it('returns the initial state', () => {
    expect(studentComposePageReducer(undefined, {})).toEqual(fromJS({
      isLoading: false,
      isLoadingClose: false,
      ask: {},
      errors: {},
      messageRes: "",
      isLoadingPin: false,
      isLoadingDelete: false,
    }));
  });
});
