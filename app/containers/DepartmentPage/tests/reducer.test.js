import { fromJS } from 'immutable';
import departmentPageReducer from '../reducer';

describe('departmentPageReducer', () => {
  it('returns the initial state', () => {
    expect(departmentPageReducer(undefined, {})).toEqual(fromJS({
      departments: [],
      isLoadingDepartment: false,
      errors: "",
      isLoadingCreate: false,
      isLoadingDelete: false,
      isLoadingUpdate: false,
      message: "",
    }));
  });
});
