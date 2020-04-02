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
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentCreateAskPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Select, Row, Layout, Icon, Input, Spin, Col } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
import { loadStudentInfo, loadTeacher, createAsk } from './actions';

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Option } = Select;
Quill.register('modules/imageDrop', ImageDrop);

/* eslint-disable react/prefer-stateless-function */
export class StudentCreateAskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        to: "",
        header: "",
        content: "",
        course: "",
      },
      isShow: false,
      courses: [],
      teachers: [],
      showTeachers: [],
    }
  }

  componentDidMount() {
    this.props.handleFetchStudentCourses();
    this.props.fetchTeacher();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.studentCreateAskPage.courses !== this.props.studentCreateAskPage.courses) {
      this.setState({
        courses: this.props.studentCreateAskPage.courses,
      })
    }
    if (prevProps.studentCreateAskPage.teachers !== this.props.studentCreateAskPage.teachers) {
      this.setState({
        teachers: this.props.studentCreateAskPage.teachers,
      })
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

  onHandleSend = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { to, header, content, course } = this.state.question;
    const askQuestion = {
      "scannedContent": content,
      "askContent": header,
      "student": user.profile,
      "teacher": to,
      "courseID": course,
      "url": ""
    }
    this.props.handleCreateAsk(askQuestion);
  }

  getTeachersByCourse = (course) => {
    const { teachers } = this.state;
    let filterTeacher = [];
    teachers.map(teacher => {
      const courseIds = teacher.courses.map(course => course._id);
      if (courseIds.includes(course)) {
        filterTeacher = [...filterTeacher, teacher];
      } else {
        filterTeacher = filterTeacher;
      }
    })
    this.setState({
      showTeachers: filterTeacher,
    })
  }

  handleChooseCourse = (value) => {
    this.setState({
      question: {
        ...this.state.question,
        to: "",
        course: value,
      }
    }, () => {
      this.getTeachersByCourse(this.state.question.course)
    })
  }

  handleChooseTeacher = (value) => {
    this.setState({
      question: {
        ...this.state.question,
        to: value,
      }
    })
  }

  handleChangeDes = (html) => {
    this.setState({
      question: {
        ...this.state.question,
        content: html,
      }
    })
  }

  render() {
    const { to, header, content } = this.state.question;
    const { isShow, courses, showTeachers } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#1593e6' }} spin />;

    const editorModule = {
      toolbar: [
        [{ 'font': [] }],
        [{ size: [] }],
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
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'image'
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
              <div className='ask-page-name-wrapper'>
                <p className="ask-page-name">Ask your tutor</p>
              </div>
            </Header>
            <Content className="create-ask-body">
              <Row gutter={25}>
                <Col span={12}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Choose course"
                    onChange={this.handleChooseCourse}
                  >
                    {
                      courses.length > 0 && courses.map(item => <Option key={item._id} value={item._id}>{item.courseCode} {item.courseName}</Option>)
                    }
                  </Select>
                </Col>
                <Col span={12}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Choose teacher"
                    value={to}
                    onChange={this.handleChooseTeacher}
                  >
                    {
                      showTeachers.length > 0 && showTeachers.map(item => <Option key={item._id} value={item._id}><img className="avatar" src={item.avatar} alt="avatar" />{item.name} {item.email}</Option>)
                    }
                  </Select>
                </Col>

              </Row>

              <div className="ask-ques">
                <label className="label">WHAT'S YOUR QUESTION?</label>
                <TextArea
                  className="input-ask-ques"
                  id="header"
                  onChange={this.onHandleChange}
                />
              </div>

              <div className="description">
                <label className="label">DESCRIPTION</label>
                <ReactQuill
                  theme="snow"
                  bounds=".create-ask-body"
                  placeholder="You can describe your problem here"
                  modules={editorModule}
                  formats={editorFomat}
                  className="input-ques-content"
                  onChange={this.handleChangeDes}
                />
              </div>

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
  handleFetchStudentCourses: PropTypes.func.isRequired,
  handleCreateAsk: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentCreateAskPage: makeSelectStudentCreateAskPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchStudentCourses: () => { dispatch(loadStudentInfo()) },
    fetchTeacher: () => { dispatch(loadTeacher()) },
    handleCreateAsk: (ask) => { dispatch(createAsk(ask)) }
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
