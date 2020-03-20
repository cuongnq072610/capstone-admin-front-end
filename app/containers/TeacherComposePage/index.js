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
import { Row, Layout, Col, Icon, Button, Spin } from 'antd';
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

//socket
import io from 'socket.io-client';
import { loadAskDetail } from './actions';
let socket;
const ENDPOINT = 'http://localhost:5000';

/* eslint-disable react/prefer-stateless-function */

export class StudentComposePage extends React.Component {
  constructor() {
    super()
    this.state = {
      showMe: true,
      isClose: false,
      isDelete: false,
      ask: {},
      message: '',
      comments: []
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.handleFetchAskDetail(id)
    socket = io(ENDPOINT);
    socket.emit('join', { message: 'Hello babe' }, (error) => {
      if (error) {
        console.log(error);
      }
    })

    socket.on('hello', (data) => {
      console.log(data);
    })
  };

  componentDidUpdate(prevProps) {
    if (prevProps.studentComposePage.ask !== this.props.studentComposePage.ask) {
      this.setState({
        ask: this.props.studentComposePage.ask,
        teacher: this.props.studentComposePage.ask.teacher,
        comments: this.props.studentComposePage.ask.comments
      })
    }
  }

  componentWillUnmount() {
    socket.emit('disconect');
    socket.off();
  }

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

  handleChangeMessage = (event) => {
    var message = event.target.value;
    this.setState({ message: message });
  }

  handleSendMessage = () => {
    const { message, ask, comments } = this.state;
    //add to messages state first to render to UI
    //emit to server with userInfo and message to save to DB
    //if error show warning, if not do nothing

    if(message) {
      const newComment = {
        "userID": ask.student._id,
        "ask": ask._id,
        "message": message,
        "dateCreated": this.getCurrentDate(),
        "__v": 0
      }
  
      this.setState({
        comments: [...comments, newComment]
      });
  
      socket.emit('send message', { message: message, user: ask.student, askID: ask._id }, (error) => {
        if (error) {
          console.log(error);
        }
      })
    }

    
  }

  getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return today = dd + '/' + mm + '/' + yyyy;
  }
  compareIDtoGetUser = (id, user1, user2) => {
    if (user1._id === id) {
      return user1
    } else if (user2._id === id) {
      return user2
    }
  }

  render() {
    const { message, comments, showMe, isClose, isDelete, ask, teacher } = this.state;
    const { Content, Header } = Layout;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#1593e6', marginRight: '10px' }} spin />;
    const { isLoading } = this.props.studentComposePage;
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
              {
                isLoading ?
                  <div className="spin-wrapper">
                    <Spin indicator={antIcon} />
                  </div> :
                  <Content className="compose-body">
                    <h1>{this.state.ask.askContent ? this.state.ask.askContent : ""}</h1>
                    <div className="commentWrapper">
                      { /* render the student scanned content as a commment */}
                      <AskAndAnswerField user={ask.student} date={ask.dateCreated} text={ask.scannedContent} />
                      {
                        comments ?
                          comments.map((comment, index) => {
                            return <AskAndAnswerField user={this.compareIDtoGetUser(comment.userID, ask.student, ask.teacher)} comment={comment} key={index} />
                          }) :
                          ''
                      }
                      </div>
                    {
                      !isClose &&
                      <div className={`reply ${showMe ? 'reply-show' : 'reply-hide'}`}>
                        {
                          showMe ?
                            <div className="reply-field">
                              <TextArea rows={6} className="reply-text" value={message} onChange={this.handleChangeMessage} />
                              <div className='reply-btn-field'>
                                <button onClick={this.onToggleShow} className='reply-btn'>
                                  <span>Hide</span>
                                  <span className='reply-icon arrow-down'></span>
                                </button>
                                <button className='reply-send' onClick={this.handleSendMessage}>
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
              }
            </Layout>
          </Col>
          <Col span={5} className="compose-question">
            {
              !isLoading && teacher &&
              <QuestionSide
                toggleClose={this.onToggleClose}
                isClosed={isClose}
                toggleDelete={this.onToggleDelete}
                isDelete={isDelete}
                handleDelete={this.handleDeleteQues}
                teacher={teacher}
              />
            }
          </Col>
        </Row>
      </div>
    );
  }
}

StudentComposePage.propTypes = {
  handleFetchAskDetail: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentComposePage: makeSelectStudentComposePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchAskDetail: (askId) => { dispatch(loadAskDetail(askId)) },
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
