/**
 *
 * WrapperLayout
 *
 */

import React from 'react';
import { Layout, Col, Row } from 'antd';
import SideMenu from '../Menu';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
const WrapperLayout = (props) => {
  const { component, getProps, role } = props;
    const Content = component;
    return (
      <Layout>
        <Row>
          <Col span={2}>
            <SideMenu role={role}/>
          </Col>
          <Col span={22}>
            <Content {...getProps} />
          </Col>
        </Row>
      </Layout>
    );
}

WrapperLayout.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default WrapperLayout;
