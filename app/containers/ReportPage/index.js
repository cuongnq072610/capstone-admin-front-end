/**
 *
 * ReportPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectReportPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Layout, Col, Row } from 'antd';

import "./index.scss";

/* eslint-disable react/prefer-stateless-function */
const { Content, Header } = Layout;

export class ReportPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>StudentAskPage</title>
          <meta name="description" content="Description of StudentAskPage" />
        </Helmet>

        <Layout className="report-page">
          <Header className="report-page-header">
            <div className='report-page-name-wrapper'>
              <p className="report-page-name">Report</p>
            </div>
          </Header>

          <Content>
            <Row>
              <Col></Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

ReportPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  reportPage: makeSelectReportPage(),
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

const withReducer = injectReducer({ key: 'reportPage', reducer });
const withSaga = injectSaga({ key: 'reportPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReportPage);
