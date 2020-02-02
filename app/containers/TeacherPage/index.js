/**
 *
 * TeacherPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Layout, Col } from 'antd';


import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTeacherPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Filter from '../../components/Filter';
import WrappedSearchBar from '../../components/SearchBar';

const { Content, Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class TeacherPage extends React.Component {
  render() {
    return (
      <Row>
        <Helmet>
          <title>Teacher Page</title>
          <meta name="description" content="Description of TeacherPage" />
        </Helmet>
        <Col span={20}>
          <Layout>
            <Header
              style={{
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                height: '100px',
              }}
            >
              <WrappedSearchBar
                message="Please enter your course name"
                placeholder="I want to find my course"
              />
            </Header>
            <Content>
              <Row type="flex" justify="space-around">

              </Row>
            </Content>
          </Layout>
        </Col>
        <Col span={4}>
          <Filter categories={[]}/>
        </Col>
      </Row>
    );
  }
}

TeacherPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teacherPage: makeSelectTeacherPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'teacherPage', reducer });
const withSaga = injectSaga({ key: 'teacherPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TeacherPage);
