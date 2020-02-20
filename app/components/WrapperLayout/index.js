/**
 *
 * WrapperLayout
 *
 */

import React from 'react';
import { Layout, Col, Row } from 'antd';
import SideMenu from '../Menu';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
const WrapperLayout = (props) => {
  const { component, getProps, role, history, match, page } = props;
    const Content = component;
    return (
      <Layout>
        <Row>
          <Col span={2}>
            <SideMenu role={role} page={page}/>
          </Col>
          <Col span={22}>
            <Content {...getProps} history={history} match={match}/>
          </Col>
        </Row>
      </Layout>
    );
}

WrapperLayout.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

export default withRouter(WrapperLayout);
