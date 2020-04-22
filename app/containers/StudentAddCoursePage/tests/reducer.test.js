import { fromJS } from 'immutable';
import studentAddCoursePageReducer from '../reducer';

describe('studentAddCoursePageReducer', () => {
  it('returns the initial state', () => {
    expect(studentAddCoursePageReducer(undefined, {})).toMatchSnapshot();
  });
});
