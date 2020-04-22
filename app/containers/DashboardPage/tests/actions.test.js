import { defaultAction, loadAdminStatistic } from '../actions';
import { DEFAULT_ACTION, LOAD_ADMIN_STATISTIC } from '../constants';

describe('DashboardPage actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
  describe('Load Statistic Action', () => {
    it('has a type of LOAD_ADMIN_STATISTIC', () => {
      const expected = {
        type: LOAD_ADMIN_STATISTIC,
      };
      expect(loadAdminStatistic()).toEqual(expected);
    });
  });
});
