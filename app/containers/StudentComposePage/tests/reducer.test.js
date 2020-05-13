import { fromJS } from 'immutable';
import studentComposePageReducer from '../reducer';

describe('studentComposePageReducer', () => {
  it('returns the initial state', () => {
    expect(studentComposePageReducer(undefined, {})).toEqual(fromJS({
      isLoading: false,
      isLoadingClose: false,
      isLoadingOpen: false,
      ask: {},
      errors: "",
      messageRes: ""
    }));
  });
});
