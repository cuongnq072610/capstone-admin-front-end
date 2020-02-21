/**
 *
 * StudentComposePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Layout, Col, Table, Icon, Button } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentComposePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Questions from './Questions';
import './compose.scss';

const { Content, Header } = Layout;

/* eslint-disable react/prefer-stateless-function */
export class StudentComposePage extends React.Component {
  
  constructor(){
    super()
    this.state={
        showMe: false
    }
  }

  operation(){
    this.setState({
      showMe:!this.state.showMe
    })
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>StudentComposePage</title>
          <meta
            name="description"
            content="Description of StudentComposePage"
          />
        </Helmet>
        <Row>
          <Col span={19} className="compose-information">
            <Layout>
              <Header className="compose-header">
              </Header>
              <Content className="compose-body">
                <div>
                  {
                    this.state.showMe?
                    <div>
                      <textarea/>
                    </div>
                    :null
                  }
                </div>
                <Button className="btn-rep" onClick={()=>this.operation()}>
                  <span className="btn-text">REPLY</span>
                </Button>
              </Content>
            </Layout>
          </Col>
          <Col span={5} className="compose-question">
            <Questions/>
          </Col>
        </Row>
      </div>
    );
  }
}

StudentComposePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentComposePage: makeSelectStudentComposePage(),
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

const withReducer = injectReducer({ key: 'studentComposePage', reducer });
const withSaga = injectSaga({ key: 'studentComposePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentComposePage);
