import React from 'react';
import { shallow, mount } from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';

import { HomePage, mapDispatchToProps } from '../index';
import makeSelectHomePage from '../selectors';
import history from '../../../utils/history';
import { Table } from 'antd';
import Filter from '../../../components/Filter';
import WrappedSearchBar from '../../../components/SearchBar';

describe('<HomePage />', () => {
  let props;
  let mountedHomePage;
  const homaOage = () => {
    if (!mountedHomePage) {
      mountedHomePage = shallow(
        <HomePage {...props} />
      );
    }
    return mountedHomePage;
  }

  beforeEach(() => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    props = {
      homePage: makeSelectHomePage(),
      fetchCourse: result.fetchCourse,
      handleFetchDepartment: result.handleFetchDepartment,
      fetchSearchCourse: result.fetchSearchCourse,
      history: history
    };
    mountedHomePage = undefined;
  })
  it("always renders a div", () => {
    const divs = homaOage().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("the rendered div", () => {
    it("contains everything else that gets rendered", () => {
      const divs = homaOage().find(".homepage");
      // When using .find, enzyme arranges the nodes in order such
      // that the outermost node is first in the list. So we can
      // use .first() to get the outermost div.
      const wrappingDiv = divs.first();

      // Enzyme omits the outermost node when using the .children()
      // method on homaOage(). This is annoying, but we can use it
      // to verify that wrappingDiv contains everything else this
      // component renders.
      expect(wrappingDiv.children()).toEqual(homaOage().children());
    });

    it("always renders a `Table`", () => {
      expect(homaOage().find(Table).length).toBe(1);
    });

    it("always renders a `Float Button`", () => {
      expect(homaOage().find('.float').length).toBe(1);
    });

    it("not renders a `Notification` when state is false", () => {
      expect(homaOage().find('.notification-home-show-course').length).toBe(0);
    });

    it("renders a `Notification` when state is true", () => {
      homaOage().setState({ isShow: true });
      expect(homaOage().find('.notification-home-show-course').length).toBe(1);
    });

    it("always renders a `Search bar`", () => {
      expect(homaOage().find(WrappedSearchBar).length).toBe(1);
    });

    describe("Search bar receive props when renders", () => {
      it("Search bar has `handleSearch` props", () => {
        const searchBar = homaOage().find(WrappedSearchBar);
        expect(searchBar.props().handleSearch).toBeDefined();
      })

      it("Search bar has `handleClear` props", () => {
        const searchBar = homaOage().find(WrappedSearchBar);
        expect(searchBar.props().handleClear).toBeDefined();
      })
    })

    it("always renders a `Filter Button`", () => {
      expect(homaOage().find('Filter').length).toBe(1);
    });

    describe("Filter Button receive props when renders", () => {
      it("Filter Button has `onFilter` props", () => {
        const filterBtn = homaOage().find(Filter);
        expect(filterBtn.props().onFilter).toBeDefined();
      })

      it("Filter Button has `onReset` props", () => {
        const filterBtn = homaOage().find(Filter);
        expect(filterBtn.props().onReset).toBeDefined();
      })
    })

  });
});
