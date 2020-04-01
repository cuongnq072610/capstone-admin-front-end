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
import { Select,Row, TextArea,Layout, Icon, Input, Spin, Col } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';

const { Header, Content, Footer } = Layout;


const dataCourse = [
  {
      "teachers": [],
      "_id": "5e74a5a6818db100040e73a0",
      "courseName": "Connecting to Computer Science",
      "courseCode": "CSI101",
      "courseURL": "https://computersciencewiki.org/index.php/Welcome",
      "dateCreated": "Fri, 20 Mar 2020 11:14:46 GMT",
      "__v": 0
  },
  {
      "teachers": [
          "5e73a2d1ce0f903b47c20b38"
      ],
      "_id": "5e7b7c4d3c1f1800048172b3",
      "courseName": "Introduction to Databases",
      "courseCode": "DBI202",
      "courseURL": "https://www.tutorialspoint.com/dbms",
      "dateCreated": "Wed, 25 Mar 2020 15:44:13 GMT",
      "__v": 0
  },
  {
      "teachers": [],
      "_id": "5e749e80818db100040e739e",
      "courseName": "Computer Organization and Architecture",
      "courseCode": "CEA201",
      "courseURL": "https://tutorialspoint.dev/computer-science/computer-organization-and-architecture",
      "dateCreated": "Fri, 20 Mar 2020 10:44:16 GMT",
      "__v": 0
  }
]

const dataTeacher = [
  {
    "_id": "5e73a2d1ce0f903b47c20b38",
    "name": "DuongVT",
    "email": "duongvt@fpt.edu.vn",
    "gender": "male",
    "avatar": "https://lh3.googleusercontent.com/a-/AOh14GghL_erp_D0JdZ4K5KVnrh25JgsaacorcYf_35m",
    "isActive": true
  },
  {
    "_id": "5e73a2d1ce0f903b47c20",
    "name": "DuongVT",
    "email": "duongvt@fpt.edu.vn",
    "gender": "male",
    "avatar": "https://lh3.googleusercontent.com/a-/AOh14GghL_erp_D0JdZ4K5KVnrh25JgsaacorcYf_35m",
    "isActive": true
  },
  {
    "_id": "5e73a2d1ce0f903b47c20b",
    "name": "DuongVT",
    "email": "duongvt@fpt.edu.vn",
    "gender": "male",
    "avatar": "https://lh3.googleusercontent.com/a-/AOh14GghL_erp_D0JdZ4K5KVnrh25JgsaacorcYf_35m",
    "isActive": true
  },
  {
    "_id": "5e73a2d1ce0f903b47c20b3",
    "name": "DuongVT",
    "email": "duongvt@fpt.edu.vn",
    "gender": "male",
    "avatar": "https://lh3.googleusercontent.com/a-/AOh14GghL_erp_D0JdZ4K5KVnrh25JgsaacorcYf_35m",
    "isActive": true
  }
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
      isShow: false,
      course : "",
      teacher: []
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

  handleChangeSelect = (value) => {
    this.setState({
      
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
    const {to, header, content } = this.state.question;
    const { isShow, course,teacher } = this.state;
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
                    onChange={this.handleChangeSelect}
                  >
                    {
                        dataCourse.map(item => <Option key={item._id} value={item._id}>{item.courseCode}{item.courseName}</Option>)
                    }
                  </Select>
                </Col>
                <Col span={12}>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Choose teacher"
                      onChange={this.handleChangeSelect}
                      value={teacher}
                    >
                      {
                          dataTeacher.map(item => <Option key={item._id} value={item._id}><img className="avatar" src={item.avatar} alt="avatar"/>{item.name}{item.email}</Option>)
                      }
                    </Select>
                </Col>

              </Row>
              
              <div className="description">
                <label className="label">DESCRIPTION</label>
                <ReactQuill
                  theme="snow"
                  bounds=".create-ask-body"
                  placeholder="You can describe your problem here"
                  modules={editorModule}
                  formats={editorFomat}
                  className="input-ques-content"
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
