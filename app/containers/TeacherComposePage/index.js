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
import { Row, Layout, Col, Icon, Button, Spin, Radio } from 'antd';
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
import { loadAskDetail, closeAsk, pinFaq, removeFaq } from './actions';
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
import checkUrlInString from '../../utils/checkLink';
Quill.register('modules/imageDrop', ImageDrop);
// const ENDPOINT = 'ws://localhost:5000';

/* eslint-disable react/prefer-stateless-function */

export class StudentComposePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMe: true,
      ask: {},
      message: '',
      comments: [],
      user: JSON.parse(localStorage.getItem("user")),
      showRadio: false,
      isClosed: false,
      answerPin: "",
      isShow: false,
    };
    this.messagesEnd = React.createRef();
  }

  ws = new WebSocket(API_ENDPOINT_WS)

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.handleFetchAskDetail(id)
    this.scrollToBottom();
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      const { comments, user } = this.state;
      // on receiving a message, add it to the list of messages
      const comment = JSON.parse(evt.data)
      // this.addMessage(message)
      if (comment) {
        // console.log(comment.comment);
        if (comment.comment.userID != user.profile) {
          this.setState({
            comments: [...comments, comment.comment]
          });
        }
      }
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }

  };

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.studentComposePage.ask !== this.props.studentComposePage.ask) {
      this.setState({
        ask: this.props.studentComposePage.ask,
        teacher: this.props.studentComposePage.ask.teacher,
        comments: this.props.studentComposePage.ask.comments,
        student: this.props.studentComposePage.ask.student,
        isClose: this.props.studentComposePage.ask.isClosed,
        answerPin: this.props.studentComposePage.ask.answer,
      })
    }
    if (prevState.comments !== this.state.comments) {
      this.scrollToBottom();
    }
    if (prevProps.studentComposePage.isLoadingClose !== this.props.studentComposePage.isLoadingClose && this.props.studentComposePage.isLoadingClose === false) {
      // show side success
      this.setState({
        isClose: true,
      })
    }

    if (prevProps.studentComposePage.isLoadingPin !== this.props.studentComposePage.isLoadingPin && this.props.studentComposePage.isLoadingPin === false) {
      // show modal success
      this.setState({
        isShow: true,
      }, () => {
        this.timer1 = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
      this.onClickCloseRadio();
      const { id } = this.props.match.params;
      this.props.handleFetchAskDetail(id)
    }
    if (this.props.studentComposePage.isLoadingDelete === false &&
      prevProps.studentComposePage.isLoadingDelete !== this.props.studentComposePage.isLoadingDelete &&
      this.props.studentComposePage.messageRes !== "") {
      this.setState({
        isShow: true,
      }, () => {
        this.timer1 = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
      const { id } = this.props.match.params;
      this.props.handleFetchAskDetail(id)
    }
  }

  handleRemoveFaq = () => {
    const { ask } = this.state;
    this.props.handleRemoveFaq(ask.faqID)
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
  }

  onToggleShow = () => {
    this.setState({
      showMe: !this.state.showMe
    })
  }

  onClickShowRadio = () => {
    this.setState({
      showRadio: true,
    })
  }

  onClickCloseRadio = () => {
    this.setState({
      showRadio: false,
      answerPin: "",
    })
  }

  handleChangeMessage = (html) => {
    this.setState({ message: html });
  }

  checkBlankInString = (str) => {
    let removeHeadTag = str.replace(/<p>/gi, "");
    let removeTailTag = removeHeadTag.replace(/<[/]p>/gi, "");
    let removeBrTag = removeTailTag.replace(/<br>/gi, "")
    if (removeBrTag && removeBrTag.trim().length > 0) {
      return true;
    } else {
      return false;
    }
  }

  handleSendMessage = () => {
    const { message, ask, comments, user } = this.state;
    //add to messages state first to render to UI
    //emit to server with userInfo and message to save to DB
    //if error show warning, if not do nothing

    if (message && this.checkBlankInString(message)) {
      const fomatMessage = checkUrlInString(message);
      const newComment = {
        "userID": user.profile,
        "ask": ask._id,
        "message": fomatMessage,
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

      this.ws.send(JSON.stringify({ message: fomatMessage, user, askID: ask._id }));
    }
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEnd.current) {
      this.messagesEnd.current.scrollIntoView();
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

  handleCloseAsk = () => {
    // action in here check
    const { id } = this.props.match.params;
    this.props.handleCloseAskDetail(id);
  }

  handleChangePinFaq = (e) => {
    this.setState({
      answerPin: e.target.value
    })
  }

  handlePinFaq = () => {
    const { answerPin, comments } = this.state;
    const { id } = this.props.match.params;
    if (answerPin) {
      this.props.handlePinFaq(id, answerPin);
    } else {
      this.props.handlePinFaq(id, comments[0].message);
    }
  }

  render() {
    const { message, comments, showMe, ask, teacher, student, showRadio, isClose, answerPin, isShow } = this.state;
    const { Content, Header } = Layout;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#1593e6', marginRight: '10px' }} spin />;
    const { isLoading, isLoadingClose, isLoadingPin, messageRes, isLoadingDelete } = this.props.studentComposePage;

    const editorModule = {
      toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['image'],
        ['clean']
      ],
      clipboard: {
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
          <title>TeacherComposePage</title>
          <meta
            name="description"
            content="Description of TeacherComposePage"
          />
        </Helmet>
        <Row className='compose'>
          <Col span={isClose ? 19 : 24} className="compose-information" style={!isClose && { marginRight: '40px' }}>
            <Layout>
              <Header className="compose-header">
                <Link to="/tutor/ask">
                  <Icon type="arrow-left" />
                </Link>
                {
                  showRadio ?
                    <div className="ask-action">
                      <Button className='ask-action-pin' onClick={this.handlePinFaq}>
                        {
                          isLoadingPin ?
                            <Spin indicator={antIcon} /> :
                            <span>Pin this question <span className='icon ask-pin'></span></span>
                        }
                      </Button>
                      <Button className='ask-action-cancel-pin' onClick={this.onClickCloseRadio}>Cancel pin this question <span className='icon ask-cancel-pin'></span></Button>
                    </div> :
                    <div className="ask-action">
                      <div className={isShow ? 'notification-show' : 'notification'}>
                        <div className='noti-content-success'>
                          <span className='icon accept-icon '></span>
                          <p style={{ fontSize: '14px' }}>{messageRes}</p>
                        </div>
                      </div>
                      {
                        (!ask.faqID || ask.faqID === "") ?
                          <Button className='ask-action-pin' onClick={this.onClickShowRadio} disabled={(comments && comments.length > 0) ? false : true}>
                            Pin this question <span className='icon ask-pin'></span>
                          </Button> :
                          <Button className='ask-action-pin' onClick={this.handleRemoveFaq}>
                            {
                              isLoadingDelete ?
                                <Spin indicator={antIcon} /> :
                                <span>Delete this pin <span className='icon ask-pin'></span></span>
                            }
                          </Button>
                      }
                      {!isClose &&
                        <Button className='ask-action-close' onClick={this.handleCloseAsk}>
                          {
                            isLoadingClose ?
                              <Spin indicator={antIcon} /> :
                              <span>Close this question <span className='icon ask-close'></span></span>
                          }
                        </Button>
                      }
                    </div>
                }
              </Header>
              {
                isLoading ?
                  <div className="spin-wrapper">
                    <Spin indicator={antIcon} />
                  </div> :
                  <Content className="compose-body">
                    <h1>{this.state.ask.askContent ? this.state.ask.askContent : ""}</h1>
                    <div className={`commentWrapper${isClose === true ? '-close' : ""}`}>
                      { /* render the student scanned content as a commment */}
                      <AskAndAnswerField user={ask.student} date={ask.dateCreated} text={ask.scannedContent} />
                      {
                        comments && comments.length > 0 ?
                          <Radio.Group onChange={this.handleChangePinFaq} defaultValue={answerPin || comments[0].message} className='faq-radio-group'>
                            {
                              comments.map((comment, index) => {
                                return <AskAndAnswerField
                                  user={this.compareIDtoGetUser(comment.userID, ask.student, ask.teacher)}
                                  comment={comment}
                                  key={index}
                                  showRadio={showRadio}
                                  answerPin={answerPin}
                                />
                              })
                            }
                          </Radio.Group>
                          :
                          ''
                      }
                      <div
                        style={{ float: "left", clear: "both", width: '100%' }}
                        ref={this.messagesEnd}
                      ></div>
                    </div>
                    {
                      !isClose &&
                      <div className={`reply ${showMe ? 'reply-show' : 'reply-hide'}`}>
                        {
                          showMe ?
                            <div className="reply-field">
                              {/* <TextArea rows={6} className="reply-text" value={message} onChange={this.handleChangeMessage} /> */}
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
          {
            isClose &&
            <Col span={5} className="compose-question">
              {
                (!isLoading && teacher) &&
                <QuestionSide
                  student={student}
                  rate={ask.rating}
                />
              }
            </Col>
          }
        </Row>
      </div>
    );
  }
}

StudentComposePage.propTypes = {
  handleFetchAskDetail: PropTypes.func.isRequired,
  handleCloseAskDetail: PropTypes.func.isRequired,
  handlePinFaq: PropTypes.func.isRequired,
  handleRemoveFaq: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentComposePage: makeSelectStudentComposePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchAskDetail: (askId) => { dispatch(loadAskDetail(askId)) },
    handleCloseAskDetail: (id) => { dispatch(closeAsk(id)) },
    handlePinFaq: (id, answer) => { dispatch(pinFaq(id, answer)) },
    handleRemoveFaq: (id) => { dispatch(removeFaq(id)) }
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
