import { fromJS } from 'immutable';
import teacherDashboardPageReducer from '../reducer';

describe('teacherDashboardPageReducer', () => {
  it('returns the initial state', () => {
    expect(teacherDashboardPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
