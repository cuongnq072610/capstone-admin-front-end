import React from 'react';
import { mount, shallow } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';
import makeSelectDashboardPage from '../selectors';

import { DashboardPage } from '../index';
import Box from '../box/box';

describe('<DashboardPage />', () => {
  let props;
  let mountedDashboardPage;
  const dashBoardPage = () => {
    if (!mountedDashboardPage) {
      mountedDashboardPage = shallow(
        <DashboardPage {...props} />
      );
    }
    return mountedDashboardPage;
  }

  beforeEach(() => {
    props = {
      dashboardPage: makeSelectDashboardPage(),
    };
    mountedDashboardPage = undefined;
  });

  it("always renders a div", () => {
    const divs = dashBoardPage().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = dashBoardPage().find("div");
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost node when using the .children()
      // method on dashBoardPage(). This is annoying, but we can use it
      // to verify that wrappingDiv contains everything else this
      // component renders.
      expect(wrappingDiv.children()).toEqual(dashBoardPage().children());
    });

    it("always renders a `Box`", () => {
      expect(dashBoardPage().find(Box).length).toBe(2);
    });
  });

  describe("when `onNavigate` is defined", () => {
    it("sets the rendered `Box`'s `onNavigate` to be defined'", () => {
      const firstBox = dashBoardPage().find(Box).first();
      expect(firstBox.props().onNavigate).toBeDefined();
    });
  });
});
