import { defaultAction, loadCourse, loadDepartment, searchCourse } from '../actions';
import { DEFAULT_ACTION, SEARCH_COURSE, LOAD_COURSE, LOAD_DEPARTMENT } from '../constants';

describe('HomePage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
  describe('Load Course Action', () => {
    it('has a type of LOAD_COURSE', () => {
      const expected = {
        type: LOAD_COURSE,
      };
      expect(loadCourse()).toEqual(expected);
    });
  });
  describe('Search Course Action', () => {
    it('has a type of SEARCH_COURSE', () => {
      const expected = {
        type: SEARCH_COURSE,
        key: "",
      };
      const checkKey = "";
      expect(searchCourse(checkKey)).toEqual(expected);
    });
  });
  describe('Load Department Action', () => {
    it('has a type of LOAD_DEPARTMENT', () => {
      const expected = {
        type: LOAD_DEPARTMENT,
      };
      expect(loadDepartment()).toEqual(expected);
    });
  });
});
