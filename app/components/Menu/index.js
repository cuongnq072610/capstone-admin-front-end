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
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          <div className="logo">
            <img
              src={this.state.collapsed ? ShortLogo : LongLogo}
              alt="FPT Logo"
            />
          </div>
          <Menu.Item key="1">
            <Link to="/">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/addcourse">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/Info">
              <Icon type="file" />
              <span>Option 3</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideMenu;
