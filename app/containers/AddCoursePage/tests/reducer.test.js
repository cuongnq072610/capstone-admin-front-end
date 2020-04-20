import { fromJS } from 'immutable';
import addCoursePageReducer from '../reducer';

describe('addCoursePageReducer', () => {
  it('returns the initial state', () => {
    expect(addCoursePageReducer(undefined, {})).toEqual(fromJS({
      errors: "",
      isLoading: false,
      isLoadingDelete: false,
      message: "",
      isDone: false,
      departments: [],
      isLoadingDepartment: false,
    }));
  });
});
