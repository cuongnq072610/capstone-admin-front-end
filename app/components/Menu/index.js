import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './index.scss';
import LongLogo from './logo.png';
import ShortLogo from './logo2.jpg';
const { Sider } = Layout;

class SideMenu extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="light"
      >
        <div className="logo">
          <img
            src={this.state.collapsed ? ShortLogo : LongLogo}
            alt="FPT Logo"
          />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="vertical"
          style={{ border: 'none' }}
        >
          <Menu.Item key="1">
            <Link to="/">
              <Icon type="pie-chart" />
              <span>Course</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/addcourse">
              <Icon type="team" />
              <span>Teacher</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/Info">
              <Icon type="user" />
              <span>Info</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideMenu;
