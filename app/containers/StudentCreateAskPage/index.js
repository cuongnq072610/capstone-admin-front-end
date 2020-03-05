/**
 *
 * StudentCreateAskPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import ReactQuill from 'react-quill';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentCreateAskPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Row, Layout, Icon, Input, Spin } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';

const { Header, Content, Footer } = Layout;
import avatar from '../../assets/png/man-1.png';

const mockData = [
  {
    _id: 1,
    name: 'Teacher A',
    email: "teacherA@gmmail.com",
  },
  {
    _id: 2,
    name: 'Teacher B',
    email: "teacherB@gmmail.com",
  },
  {
    _id: 3,
    name: 'Teacher C',
    email: "teacherC@gmmail.com",
  },
  {
    _id: 4,
    name: 'Teacher D',
    email: "teacherD@gmmail.com",
  },
  {
    _id: 5,
    name: 'Teacher E',
    email: "teacherE@gmmail.com",
  },

  {
    _id: 6,
    name: 'Teacher F',
    email: "teacherF@gmmail.com",
  },
  {
    _id: 7,
    name: 'Teacher G',
    email: "teacherG@gmmail.com",
  },
  {
    _id: 8,
    name: 'Teacher H',
    email: "teacherH@gmmail.com",
  },

  {
    _id: 9,
    name: 'Teacher I',
    email: "teacherI@gmmail.com",
  },
  {
    _id: 10,
    name: 'Teacher J',
    email: "teacherJ@gmmail.com",
  },
]

/* eslint-disable react/prefer-stateless-function */
export class StudentCreateAskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        to: "",
        header: "",
        content: "",
      },
      isShow: false
    }
  }

  onHandleChange = (e) => {
    this.setState({
      question: {
        ...this.state.question,
        [e.target.id]: e.target.value,
      }
    })
  }

  onHandleChooseTutor = (teacher) => {
    this.setState({
      question: {
        ...this.state.question,
        to: teacher.email
      }
    })
  }

  onHandleSend = () => {
    this.setState({
      isShow: !this.state.isShow
    })
  }

  render() {
    const {
      to, header, content
    } = this.state.question;
    const { isShow } = this.state;
      console.log(isShow)
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#1593e6' }} spin />;
    const editorModule = {
      toolbar: [
        [{ 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['image', 'video'],
        ['clean']
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    };
    const editorFomat = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'image', 'video'
    ]

    return (
      <div>
        <Helmet>
          <title>StudentCreateAskPage</title>
          <meta
            name="description"
            content="Description of StudentCreateAskPage"
          />
        </Helmet>
        <Row className='create-ask'>
          <Layout>
            <Header className="create-ask-header">
              <Link to="/ask">
                <Icon type="arrow-left" />
              </Link>
            </Header>
            <Content className="create-ask-body">
              <Input
                id="to"
                className="input-ques-to"
                placeholder="To :"
                value={to}
                onChange={this.onHandleChange}
              />
              <div className="tutor-field">
                <p>Your tutors:</p>
                {/* <Spin indicator={antIcon}/> */}
                <div className="tutor-all">
                  {
                    mockData.map((teacher, index) => {
                      return (
                        <button key={index} className="tutor-field-btn" onClick={() => this.onHandleChooseTutor(teacher)}>
                          <img src={avatar} className="tutor-avatar" />
                          <p className="tutor-name">{teacher.name}</p>
                        </button>
                      )
                    })
                  }
                </div>
              </div>
              <hr style={{ width: '40%', marginLeft: '0px', marginBottom: '30px' }}></hr>
              <Input
                id="header"
                className="input-ques-title"
                placeholder="What's your question?"
                value={header}
                onChange={this.onHandleChange}
              />
              <ReactQuill
                theme="snow"
                bounds=".create-ask-body"
                placeholder="You can describe your problem here"
                modules={editorModule}
                formats={editorFomat}
                className="input-ques-content"
              // onChange
              // value
              />
            </Content>
            <Footer className="create-ask-footer">
              <button className="btn-send" onClick={this.onHandleSend}>
                {/* <Spin indicator={antIcon}/> */}
                Send Question
                <span className="btn-send-icon"></span>
              </button>
              <div className={isShow ? 'notification-show' : 'notification'}>
                {/* {
                  errMess && errMess.length > 0 && */}
                <div className='noti-content-error'>
                  <span className='icon-noti deny-icon'></span>
                  <p>Wrong</p>
                </div>
                {/* } */}
              </div>
            </Footer>
          </Layout>
        </Row>
      </div>
    );
  }
}

StudentCreateAskPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentCreateAskPage: makeSelectStudentCreateAskPage(),
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

const withReducer = injectReducer({ key: 'studentCreateAskPage', reducer });
const withSaga = injectSaga({ key: 'studentCreateAskPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentCreateAskPage);
