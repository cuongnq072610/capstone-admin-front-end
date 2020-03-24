import { fromJS } from 'immutable';
import studentDashboardPageReducer from '../reducer';

describe('studentDashboardPageReducer', () => {
  it('returns the initial state', () => {
    expect(studentDashboardPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
