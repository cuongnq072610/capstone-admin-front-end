import React from 'react';
import { mount, shallow } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import { DepartmentPage, mapDispatchToProps } from '../index';
import makeSelectDepartmentPage from '../selectors';
import history from '../../../utils/history';
import { Table } from 'antd';

describe('<DepartmentPage />', () => {
  let props;
  let mountedDepartment;
  const departmentPage = () => {
    if (!mountedDepartment) {
      mountedDepartment = shallow(
        <DepartmentPage {...props} />
      )
    }
    return mountedDepartment;
  }

  beforeEach(() => {
    let dispatch = jest.fn();
    let result = mapDispatchToProps(dispatch);
    props = {
      departmentPage: makeSelectDepartmentPage(),
      handleLoadDepartment: result.handleLoadDepartment,
      history: history
    }
    mountedDepartment = undefined;
  })

  it("always renders a div", () => {
    const divs = departmentPage().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = departmentPage().find(".department-page");
      const wrappingDiv = divs.first();
      expect(wrappingDiv.children()).toEqual(departmentPage().children());
    });

    it("always renders a `Table`", () => {
      expect(departmentPage().find(Table).length).toBe(1);
    });

    it("not renders a `Notification` when isShow is false", () => {
      expect(departmentPage().find('.notification-show').length).toBe(0);
    });

    it("renders a `Notification` when isShow is true", () => {
      departmentPage().setState({ isShow: true });
      expect(departmentPage().find('.notification-show').length).toBe(1);
    });

    describe("Filter side render", () => {
      it("Button add will render", () => {
        expect(departmentPage().find('.department-add-btn').length).toBe(1);
      })

      it("Input new department will render", () => {
        expect(departmentPage().find('.add-department').length).toBe(1);
      })

      it("Render error field", () => {
        departmentPage().setState({ error: "This is test error" });
        expect(departmentPage().find('.error-field').length).toBe(1);
      })
    })

    it("renders a `info-side` when isOpen is true", () => {
      departmentPage().setState({ isOpen: true, selectedDepartmnent: { courses: [] } });
      expect(departmentPage().find('.info-side').length).toBe(1);
    });

    describe("Info side renders", () => {
      beforeEach(() => {
        departmentPage().setState({
          isOpen: true,
          selectedDepartmnent: { courses: [] },
        });
      })
      it("Button back will render", () => {
        expect(departmentPage().find('.info-back').length).toBe(1);
      })

      it("Department title will render", () => {
        expect(departmentPage().find('.department-tile').length).toBe(1);
      })

      it("Button delete will render", () => {
        expect(departmentPage().find('.info-delete').length).toBe(1);
      })

      it("Button update will render", () => {
        expect(departmentPage().find('.info-finish').length).toBe(1);
      })

      it("Courses will render when select department", () => {
        departmentPage().setState({
          selectedDepartmnent: {
            _id: "5e7b8dda07a2c70004ec8b5f",
            name: "Physical",
            description: "Physical",
            courses: [
              {
                courseCode: "Check",
                courseName: "Check"
              }
            ]
          },
        });
        expect(departmentPage().find('.course-name').length).toBeGreaterThan(0);

      })

      it("Courses doesn't render when do not select department", () => {
        expect(departmentPage().find('.course-name').length).toBe(0);
      })
    })

    it("renders a `filter-side` when isOpen is false", () => {
      departmentPage().setState({ isOpen: false });
      expect(departmentPage().find('.filter-side').length).toBe(1);
    });
  });
});
