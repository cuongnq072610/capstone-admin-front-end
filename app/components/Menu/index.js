import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Tooltip } from 'antd';
import './index.scss';
import LogoPurple from './assets/Logo/noteIt-purple.png';
import LogoRed from './assets/Logo/noteIt-red.png';
import LogoBlue from './assets/Logo/noteIt-blue.png';
import LogoCyan from './assets/Logo/noteIt-cyan.png';
import LogoGreen from './assets/Logo/noteIt-green.png';
import LogoOrange from './assets/Logo/noteIt-orange.png';
import UserIcon from './assets/man1.png'

import history from '../../utils/history';

class SideMenu extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  renderLogo = (pathname) => {
    switch (pathname) {
      case "/":
        return LogoBlue;
      case "/course":
        return LogoPurple;
      case "/addcourse":
        return LogoPurple;
      case "/teacher":
        return LogoRed;
      case "/addteacher":
        return LogoPurple;
      case "/ask":
        return LogoCyan;
      case "/compose":
        return LogoCyan;
      default:
        break;
    }
  }

  render() {
    return (
      <Layout id="sideMenu">
        <div className="logo">
          <img
            src={this.renderLogo(history.location.pathname)}
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
            <Tooltip title="Dashboard" placement="right">
              <NavLink exact to="/" activeClassName="dashboard-active" className="menu-icon dashboard">
              </NavLink>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="2">
            <Tooltip title="Course" placement="right">
              <NavLink exact to="/course" activeClassName="course-active" className="menu-icon course">
              </NavLink>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="3">
            <Tooltip title="Teacher" placement="right">
              <NavLink to="/teacher" activeClassName="teacher-active" className="menu-icon teacher">
              </NavLink>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="4">
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
