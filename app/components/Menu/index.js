import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Tooltip } from 'antd';

import './index.scss';
import Logo from './noteIt.png';

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
                <Link to="/">
                  <Icon type="pie-chart" />
                </Link>
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="2">
              <Tooltip title="Teacher" placement="right">
                <Link to="/addcourse">
                  <Icon type="team" />
                </Link>
              </Tooltip>

            </Menu.Item>
            <Menu.Item key="3">
              <Tooltip title="Info" placement="right">
                <Link to="/Info">
                  <Icon type="user" />
                </Link>
              </Tooltip>
            </Menu.Item>
          </Menu>
        </div>
      </Layout>
    );
  }
}

export default SideMenu;
