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
import { API_ENDPOINT_WS } from '../../constants/apis';

//socket
import { loadAskDetail, closeAsk, reopenAsk } from './actions';
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageDrop', ImageDrop);

// const ENDPOINT = 'ws://localhost:5000';

/* eslint-disable react/prefer-stateless-function */

export class StudentComposePage extends React.Component {
  constructor() {
    super(props);
    this.state = {
      showMe: true,
      isClose: false,
      isDelete: false,
      ask: {},
      message: '',
      comments: [],
      user: JSON.parse(localStorage.getItem("user")),
      rate: '',
      isShow: false,
      isCloseToggle: false,
    };
    this.messagesEnd = React.createRef();
  }

  ws = new WebSocket(API_ENDPOINT_WS)

  componentDidMount() {
    console.log(API_ENDPOINT_WS)
    const { id } = this.props.match.params;
    this.props.handleFetchAskDetail(id);

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      const { comments } = this.state;
      // on receiving a message, add it to the list of messages
      const comment = JSON.parse(evt.data)
      // this.addMessage(message)

      // if(comment) {
      //   console.log(comment.comment)
      //   this.setState({
      //     comments: [...comments, comment.comment]
      //   });
      // }
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
    this.scrollToBottom();
  };

  componentDidUpdate(prevProps) {
    this.scrollToBottom();
    if (prevProps.studentComposePage.ask !== this.props.studentComposePage.ask &&
      prevProps.studentComposePage.isLoading !== this.props.studentComposePage.isLoading && this.props.studentComposePage.isLoading === false
    ) {
      this.setState({
        ask: this.props.studentComposePage.ask,
        teacher: this.props.studentComposePage.ask.teacher,
        comments: this.props.studentComposePage.ask.comments,
        isClose: this.props.studentComposePage.ask.isClosed,
        rate: this.props.studentComposePage.ask.rating,
      })
    }

    if (prevProps.studentComposePage.isLoadingClose !== this.props.studentComposePage.isLoadingClose && this.props.studentComposePage.isLoadingClose === false) {
      // show modal success
      this.setState({
        isShow: true,
        isClose: true,
      }, () => {
        this.timer1 = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
    }

    if (prevProps.studentComposePage.isLoadingOpen !== this.props.studentComposePage.isLoadingOpen && this.props.studentComposePage.isLoadingOpen === false) {
      // show modal success
      this.setState({
        isShow: true,
        isClose: false,
      }, () => {
        this.timer1 = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
  }

  onToggleShow = () => {
    this.setState({
      showMe: !this.state.showMe
    })
  }

  onToggleClose = () => {
    this.setState({
      isCloseToggle: !this.state.isCloseToggle,
    })
  }

  handleChangeMessage = (html) => {
    this.setState({ message: html });
  }

  handleSendMessage = () => {
    const { message, ask, comments, user } = this.state;
    //add to messages state first to render to UI
    //emit to server with userInfo and message to save to DB
    //if error show warning, if not do nothing
    if (message) {
      const newComment = {
        "userID": user.profile,
        "ask": ask._id,
        "message": message,
        "dateCreated": this.getCurrentDate(),
        "__v": 0
      }
      this.setState({
        comments: [...comments, newComment]
      }, () => {
        // clear message after send
        this.setState({
          message: ""
        })
      });

      this.ws.send(JSON.stringify({ message, user, askID: ask._id }));
    }
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEnd.current) {
      this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var MM = today.getMinutes();
    var ss = today.getSeconds();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (hh < 10) {
      hh = '0' + hh;
    }
    if (MM < 10) {
      MM = '0' + MM;
    }
    if (ss < 10) {
      ss = '0' + ss;
    }
    return today = `${yyyy}-${mm}-${dd} ${hh}:${MM}:${ss}`;
  }

  compareIDtoGetUser = (id, user1, user2) => {
    if (user1._id === id) {
      return user1
    } else if (user2._id === id) {
      return user2
    }
  }

  handleChangeRate = value => {
    this.setState({ rate: value });
  };

  handleCloseAsk = () => {
    const { rate } = this.state;
    // action in here
    const { id } = this.props.match.params;
    this.props.handleCloseAskDetail(id, rate);
  }

  handleReopenAsk = () => {
    // action in here
    const { id } = this.props.match.params;
    this.props.handleReopenAskDetail(id);
  }

  render() {
    const { message, comments, showMe, isClose, isShow, ask, teacher, rate, isCloseToggle } = this.state;
    const { Content, Header } = Layout;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#1593e6', marginRight: '10px' }} spin />;
    const { isLoading, isLoadingClose, messageRes, isLoadingOpen } = this.props.studentComposePage;

    const editorModule = {
      toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['image'],
        ['clean']
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
      imageDrop: true,
    };
    const editorFomat = [
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'image'
    ]

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
                    <div className={`commentWrapper${isClose === true ? '-close' : ""}`} id="commentWrapper">
                      { /* render the student scanned content as a commment */}
                      <AskAndAnswerField user={ask.student} date={ask.dateCreated} text={ask.scannedContent} />
                      {
                        comments ?
                          comments.map((comment, index) => {
                            return <AskAndAnswerField user={this.compareIDtoGetUser(comment.userID, ask.student, ask.teacher)} comment={comment} key={index} />
                          }) :
                          ''
                      }
                      <div
                        style={{ float: "left", clear: "both" }}
                        ref={this.messagesEnd}
                      >
                      </div>
                    </div>
                    {
                      !isClose &&
                      <div className={`reply ${showMe ? 'reply-show' : 'reply-hide'}`}>
                        {
                          showMe ?
                            <div className="reply-field">
                              <ReactQuill
                                theme="bubble"
                                bounds=".reply-show"
                                placeholder="You can answer here"
                                modules={editorModule}
                                formats={editorFomat}
                                className="reply-text"
                                value={message}
                                onChange={this.handleChangeMessage}
                              />
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
                isCloseToggle={isCloseToggle}
                teacher={teacher}
                handleRate={this.handleChangeRate}
                rate={rate}
                handleCloseAsk={this.handleCloseAsk}
                isLoadingClose={isLoadingClose}
                isLoadingOpen={isLoadingOpen}
                onReopenAsk={this.handleReopenAsk}
              />
            }
            <div className={isShow ? 'notification-show' : 'notification'}>
              <div className='noti-content-success'>
                <span className='icon-noti accept-icon'></span>
                <p>{messageRes}</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

StudentComposePage.propTypes = {
  handleFetchAskDetail: PropTypes.func.isRequired,
  handleCloseAskDetail: PropTypes.func.isRequired,
  handleReopenAskDetail: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentComposePage: makeSelectStudentComposePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchAskDetail: (askId) => { dispatch(loadAskDetail(askId)) },
    handleCloseAskDetail: (id, rate) => { dispatch(closeAsk(id, rate)) },
    handleReopenAskDetail: (id) => { dispatch(reopenAsk(id)) },
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
