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
import { Row, Layout, Col, Icon, Button } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentComposePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import QuestionSide from './QuestionsSide';
import './compose.scss';
import TextArea from 'antd/lib/input/TextArea';
import AskAndAnswerField from './Question';

const { Content, Header } = Layout;
/* eslint-disable react/prefer-stateless-function */
export class StudentComposePage extends React.Component {

  constructor() {
    super()
    this.state = {
      showMe: false,
      isClose: false,
      isDelete: false,
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

  onToggleShow = () => {
    this.setState({
      showMe: !this.state.showMe
    })
  }

  onToggleClose = () => {
    this.setState({
      isClose: true,
    })
  }

  onToggleDelete = () => {
    this.setState({
      isDelete: !this.state.isDelete,
    })
  }

  handleDeleteQues = () => {
    this.onToggleDelete();
  }

  render() {
    const { teachers, showMe, isClose, isDelete } = this.state;
    return (
      <div>
        <Helmet>
          <title>StudentComposePage</title>
          <meta
            name="description"
            content="Description of StudentComposePage"
          />
        </Helmet>
        <Row className='compose'>
          <Col span={19} className="compose-information">
            <Layout>
              <Header className="compose-header">
                <Link to="/ask">
                  <Icon type="arrow-left" />
                </Link>
              </Header>
              <Content className="compose-body">
                <h1>{this.state.teacher.question ? this.state.teacher.question : ""}</h1>
                <AskAndAnswerField />
                {
                  !isClose &&
                  <div className={`reply ${showMe ? 'reply-show' : 'reply-hide'}`}>
                    {
                      showMe ?
                        <div className="reply-field">
                          <TextArea rows={5} className="reply-text" />
                          <div className='reply-btn-field'>
                            <button onClick={this.onToggleShow} className='reply-btn'>
                              <span>Hide</span>
                              <span className='reply-icon arrow-down'></span>
                            </button>
                            <button className='reply-send'>
                              <span>Send</span>
                              <span className='reply-icon send'></span>
                            </button>
                          </div>
                        </div> :
                        <div className="reply-field">
                          <div style={{ width: '85%' }}></div>
                          <button onClick={this.onToggleShow} className='reply-btn'>
                            <span>Show</span>
                            <span className='reply-icon arrow-up'></span>
                          </button>
                        </div>
                    }
                  </div>
                }
              </Content>
            </Layout>
          </Col>
          <Col span={5} className="compose-question">
            <QuestionSide
              toggleClose={this.onToggleClose}
              isClosed={isClose}
              toggleDelete={this.onToggleDelete}
              isDelete={isDelete}
              handleDelete={this.handleDeleteQues}
            />
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
