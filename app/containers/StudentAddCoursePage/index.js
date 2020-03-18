/**
 *
 * StudentAddCoursePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Table, Col, Button, Icon, Layout, Input } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentAddCoursePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import './index.scss'
import columns from './tableCol';
const { Header, Content } = Layout;

const coursesData = [
  {
    "departments": [
      "business",
      "computer",
      "finance"
    ],
    "teachers": [
      {
        "rating": {
          "star_1": 1,
          "star_2": 2,
          "star_3": 2,
          "star_4": 2,
          "star_5": 2
        },
        "courses": [
          "5e4eae6f13ac44145c50d47a"
        ],
        "_id": "5e4eaccf7c213e67373d41b5",
        "teacherName": "Second",
        "email": "second@fpt.edu.vn",
        "gender": "male",
        "avatar": "https://i.imgur.com/hVx1hrb.png",
        "isActive": true
      }
    ],
    "_id": "5e4eae6f13ac44145c50d47a",
    "courseName": "1st course",
    "courseCode": "1",
    "shortDes": "1st course check",
    "fullDes": "The 1st course",
    "courseURL": "abc.com",
    "dateCreated": "20/02/2020",
    "__v": 0
  },
  {
    "departments": [
      "business",
      "engineering",
      "finance"
    ],
    "teachers": [
      {
        "rating": {
          "star_1": 1,
          "star_2": 2,
          "star_3": 2,
          "star_4": 2,
          "star_5": 2
        },
        "courses": [
          "5e4eae6f13ac44145c50d47a"
        ],
        "_id": "5e4eaccf7c213e67373d41b5",
        "teacherName": "Second",
        "email": "second@fpt.edu.vn",
        "gender": "male",
        "avatar": "https://i.imgur.com/hVx1hrb.png",
        "isActive": true
      }
    ],
    "_id": "5e4eaf15534ce32de4a9ffb2",
    "courseName": "THIS IS MAC LENIN",
    "courseCode": "CAA302",
    "shortDes": "2nd course haha",
    "fullDes": "The 2nd course haha ",
    "courseURL": "kenh14.com",
    "dateCreated": "20/02/2020",
    "__v": 0
  },
  {
    "departments": [
      "design"
    ],
    "teachers": [],
    "_id": "5e4f95a4d9902200043bdf9d",
    "courseName": "Ho Chi Minh",
    "courseCode": "HCM201",
    "shortDes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis pretium nisl.  12313131231",
    "fullDes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis pretium nisl. Pellentesque egestas, justo in lacinia aliquet, arcu ligula lacinia nisl, non ultrices elit ipsum in urna. Nulla ut rhoncus quam.",
    "courseURL": "kenh14.com",
    "dateCreated": "21/02/2020",
    "__v": 0
  },
  {
    "departments": [
      "business",
      "computer",
      "finance"
    ],
    "teachers": [],
    "_id": "5e4fe252fd79b60004e0b633",
    "courseName": "1st course New",
    "courseCode": "AVC195",
    "shortDes": "1st course new",
    "fullDes": "The 1st course",
    "courseURL": "abc.com",
    "dateCreated": "21/02/2020",
    "__v": 0
  },
  {
    "departments": [
      "business",
      "engineering"
    ],
    "teachers": [],
    "_id": "5e54789da216a7000434e029",
    "courseName": "THIS IS MAC LENIN New",
    "courseCode": "MLN101",
    "shortDes": "check",
    "fullDes": "The 2nd course haha ",
    "courseURL": "kenh14.com",
    "dateCreated": "25/02/2020",
    "__v": 0
  },
  {
    "departments": [
      "business"
    ],
    "teachers": [],
    "_id": "5e54792fa216a7000434e02a",
    "courseName": "1st course demo",
    "courseCode": "MLN201",
    "shortDes": "1st course",
    "fullDes": "The 1st course",
    "courseURL": "abc.com",
    "dateCreated": "25/02/2020",
    "__v": 0
  }
]
/* eslint-disable react/prefer-stateless-function */
export class StudentAddCoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      selectedTeacher: {},
      selectedRow: "",
      courses: [],
      chosenCourses: [],
    }
  }

  componentDidMount() {
    this.setState({
      courses: coursesData
    })
  }

  navigateDashboard = () => {
    this.props.history.push({
      pathname: '/student'
    })
  }

  addCourse = (courseOfRow, rowIndex) => {
    const { chosenCourses, courses } = this.state;

    //remove course about to be added from "Others Courses" list 
    const courseLeft = courses.filter((courseCurrent) => {
      return courseCurrent.key != courseOfRow.key
    })

    //push course into chosen course list
    chosenCourses.push(courseOfRow);

    this.setState({
      chosenCourses: chosenCourses,
      courses: courseLeft
    })
  }

  removeCourse = (courseOfRow, rowIndex) => {
    const { chosenCourses, courses } = this.state;

    //remove course about to be removed from "Added Course" list 
    const courseLeft = chosenCourses.filter((courseCurrent) => {
      return courseCurrent.key != courseOfRow.key
    })

    //push course into Other Courses list
    courses.push(courseOfRow);

    this.setState({
      chosenCourses: courseLeft,
      courses: courses
    })
  }

  render() {
    const { courses, chosenCourses } = this.state;
    return (
      <div>
        <Helmet>
          <title>StudentAddCoursePage</title>
          <meta
            name="description"
            content="Description of StudentAddCoursePage"
          />
        </Helmet>
        <Row className='addcourse-page'>
          <Col>
            <Layout>
              <div className="header-wrapper">
                <div className="header">
                  <Button style={{ border: 'none' }} onClick={this.navigateDashboard}>
                    <Icon type="arrow-left" />
                  </Button>
                  <p className="p"><b>Add Courses</b></p>
                </div>
                <Input className="search-course"
                  name='search-course'
                  placeholder="Search for courses"
                  onKeyUp={this.handleSearchInput}
                  prefix={<Icon type="search" style={{ color: '#1593e6' }} />}
                />
              </div>
              <Content>
                <Row className="content-table">
                  <div className="chosen">
                    <h3 className="chosen-course" >{this.state.chosenCourses.length} CHOSEN COURSES</h3>
                    {chosenCourses && chosenCourses.length > 0 ?
                      <Table className="table-content"
                        columns={columns.columnToRemove}
                        dataSource={chosenCourses}
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: e => this.removeCourse(record, rowIndex)
                          }
                        }}
                      />
                      :
                      <p>No data</p>
                    }
                  </div>
                  <div className="chosen-other">
                    <h3 className="chosen-other-course">OTHERS</h3>
                    <Table className="table-content-non"
                      columns={columns.columnToAdd}
                      dataSource={courses}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: e => this.addCourse(record, rowIndex)
                        }
                      }}
                    />
                  </div>
                </Row>
              </Content>
            </Layout>
          </Col>
        </Row>
      </div>
    );
  }
}

StudentAddCoursePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentAddCoursePage: makeSelectStudentAddCoursePage(),
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

const withReducer = injectReducer({ key: 'studentAddCoursePage', reducer });
const withSaga = injectSaga({ key: 'studentAddCoursePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentAddCoursePage);
