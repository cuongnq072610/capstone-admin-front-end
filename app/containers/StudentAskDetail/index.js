/**
 *
 * StudentAskDetail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentAskDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Row, Col, Button, Icon, Input, Layout } from 'antd';

import './index.scss'

import Message from './Message'

const { Content, Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class StudentAskDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <Row className="askDetailPage">
        <Helmet>
            <title>Ask Detail Page</title>
            <meta name="description" content="Description of ask detail page" />
        </Helmet>

        <Col span={19} className="mainInfo">
            <Button className="back-icon" onClick={() => this.props.history.push("/ask")}>
              <Icon type="arrow-left" />
            </Button>
            <h2>Why the creator of Android left his own company?</h2>
            <div className="messageContainer">
              <Message />
            </div>
        </Col>

        <Col span={5} className="sideInfo">
          <Layout className="note-side">
            <Header className="filter-head">
              <FormattedMessage {...messages.sideTitle} />
            </Header>
            
            <Content>

            </Content>
          </Layout>
        </Col>
      </Row>
    );
  }
}

StudentAskDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentAskDetail: makeSelectStudentAskDetail(),
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

const withReducer = injectReducer({ key: 'studentAskDetail', reducer });
const withSaga = injectSaga({ key: 'studentAskDetail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentAskDetail);
