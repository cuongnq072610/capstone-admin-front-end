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
import { AdminMenu, StudentMenu } from './constant';

class SideMenu extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  renderLogo = (pathname) => {
    switch (pathname) {
      case "dashboard":
        return LogoBlue;
      case "course":
        return LogoPurple;
      case "teacher":
        return LogoRed;
      case "note":
        return LogoOrange;
      case "ask":
        return LogoCyan;
      case "highlight":
        return LogoGreen;
      default:
        break;
    }
  }

  renderMenu = () => {
    const { role } = this.props;
    return (
      role === 'admin' ?
        AdminMenu.map((menu, index) => {
          return (
            <Menu.Item key={index}>
              <Tooltip title={menu.title} placement="right">
                <NavLink exact={menu.exact} to={menu.path} activeClassName={`${menu.name}-active`} className={`menu-icon ${menu.name}`}>
                </NavLink>
              </Tooltip>
            </Menu.Item>
          )
        }) : StudentMenu.map((menu, index) => {
          return (
            <Menu.Item key={index + 1}>
              <Tooltip title={menu.title} placement="right">
                <NavLink exact={menu.exact} to={menu.path} activeClassName={`${menu.name}-active`} className={`menu-icon ${menu.name}`}>
                </NavLink>
              </Tooltip>
            </Menu.Item>
          )
        })
    )
  }

  render() {
    const { page } = this.props;
    return (
      <Layout id="sideMenu">
        <div className="logo">
          <img
            src={this.renderLogo(page)}
            alt="NoteIt Logo"
          />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="vertical"
          style={{ border: 'none' }}
        >
          {
            this.renderMenu()
          }
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
