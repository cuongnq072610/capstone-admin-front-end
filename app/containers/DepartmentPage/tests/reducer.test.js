import { fromJS } from 'immutable';
import departmentPageReducer from '../reducer';

describe('departmentPageReducer', () => {
  it('returns the initial state', () => {
    expect(departmentPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
