import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Layout, Menu, Tooltip } from 'antd';
import './index.scss';
import Logo from './assets/noteIt.png';
import Logo2 from './assets/noteIt2.png';
import UserIcon from './assets/man1.png'

import history from '../../utils/history';

class SideMenu extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout id="sideMenu">
        <div className="logo">
          <img
            src={history.location.pathname === "/" || history.location.pathname === "/addcourse" ? Logo : Logo2}
            alt="NoteIt Logo"
          />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="vertical"
          style={{ border: 'none' }}
        >
          <Menu.Item key="1">
            <Tooltip title="Course" placement="right">
              <NavLink exact to="/" activeClassName="course-active" className="menu-icon course">
              </NavLink>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="2">
            <Tooltip title="Teacher" placement="right">
              <NavLink to="/teacher" activeClassName="teacher-active" className="menu-icon teacher">
              </NavLink>
            </Tooltip>

          </Menu.Item>
          <Menu.Item key="3">
            <Tooltip title="Info" placement="right">
              <NavLink to="/info">
                <img
                  src={UserIcon}
                  alt="User Logo"
                />
              </NavLink>
            </Tooltip>
          </Menu.Item>
        </Menu>
      </Layout>
    );
  }
}

export default SideMenu;
