import { fromJS } from 'immutable';
import chooseRolePageReducer from '../reducer';

describe('chooseRolePageReducer', () => {
  it('returns the initial state', () => {
    expect(chooseRolePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
