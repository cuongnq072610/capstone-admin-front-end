import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Layout, Menu, Tooltip } from 'antd';

import './index.scss';
import Logo from './assets/noteIt.png';
import CourseIcon from './assets/Path_56.png';
import TeacherIcon from './assets/Path_57.png';
import UserIcon from './assets/man1.png'


class SideMenu extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout>
        <div id="sideMenu">
          <div className="logo">
            <img
              src={Logo}
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
                <NavLink exact to="/" activeClassName="selected">
                  <img
                    src={CourseIcon}
                    alt="Course Logo"
                  />
                </NavLink>
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="2">
              <Tooltip title="Teacher" placement="right">
                <NavLink to="/teacher" activeClassName="selected">
                  <img
                    src={TeacherIcon}
                    alt="Teacher Logo"
                  />
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
        </div>
      </Layout>
    );
  }
}

export default SideMenu;
