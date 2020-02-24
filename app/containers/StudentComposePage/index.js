/**
 *
 * StudentComposePage
 *
 */

import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Layout, Col, Icon, Button, Form } from 'antd';

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
        showMe: false,
        teacher: {},
    }
  }

  componentDidMount() {
    if (this.props.history.location.state) {
      this.setState({
        teacher: this.props.history.location.state.teacher
      })
    }
  };
  
  operation(){
    this.setState({
      showMe:!this.state.showMe
    })
  }
  render() {
    const { teachers } = this.state;
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
                <Link to="/ask">
                  <Icon type="arrow-left" />
                </Link>
              </Header>
              <Content className="compose-body">
                <Form>
                  <input
                    className="compose-question"
                    type="text"
                    placeholder="Give your course a name"
                    value = {this.state.teacher.question ? this.state.teacher.question : ""}
                  />
                </Form>
                <hr className="hr"/>
                <div className="reply">
                  {
                    this.state.showMe?
                    <div>
                      <div>
                        <Button className="btn-hide" onClick={()=>this.operation()}>
                          <span className="btn-hide-text">HIDE</span>
                          <Button className="btn-send">
                            <span className="btn-send-text">SEND</span>
                          </Button>
                        </Button>
                      </div>
                      </div>
                      :
                      <div>
                        <Button className="btn-reply" onClick={()=>this.operation()}>
                          <span className="btn-reply-text">REPLY</span>
                        </Button>
                    </div>
                  }
                </div>
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
