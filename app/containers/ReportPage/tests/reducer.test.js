import { fromJS } from 'immutable';
import reportPageReducer from '../reducer';

describe('reportPageReducer', () => {
  it('returns the initial state', () => {
    expect(reportPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
