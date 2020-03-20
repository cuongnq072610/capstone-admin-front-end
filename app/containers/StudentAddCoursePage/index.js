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
import { Row, Table, Col, Button, Icon, Layout, Input, Spin } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentAddCoursePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import './index.scss'
import columns from './tableCol';
import { loadCourse, searchCourse, updateCourse } from './actions';
import WrappedSearchBar from '../../components/SearchBar';
const { Header, Content } = Layout;

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
    this.props.fetchCourse();
    const { stuCourses } = this.props.history.location.state;
    var chosenCourses = stuCourses.map((course, index) => {
      return {
        ...course,
        key: `${index}`
      }
    })
    this.setState({
      chosenCourses
    })
  }

  componentDidUpdate(prevProps) {
    const { chosenCourses } = this.state;
    if (prevProps.studentAddCoursePage.courses !== this.props.studentAddCoursePage.courses) {
      const { courses } = this.props.studentAddCoursePage;
      const newCourses = courses.map((course, index) => {
        return {
          ...course,
          key: `${index}`,
        }
      })
      // check duplicate courses
      if (chosenCourses && chosenCourses.length > 0) {
        var checkFormatCourse = newCourses.filter(course => chosenCourses.map(chosenCourse => chosenCourse._id).indexOf(course._id) === -1)
        this.setState({
          courses: checkFormatCourse,
        })
      } else {
        this.setState({
          courses: newCourses,
        })
      }
    }
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
      return courseCurrent._id != courseOfRow._id
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
      return courseCurrent._id != courseOfRow._id
    })

    //push course into Other Courses list
    courses.push(courseOfRow);

    this.setState({
      chosenCourses: courseLeft,
      courses: courses
    })
  }

  handleSearch = (key) => {
    this.props.fetchSearchCourse(key)
  }

  handleClear = () => {
    this.props.fetchCourse();
  }

  handleUpdateCourse = () => {
    const { chosenCourses } = this.state;
    const courses = chosenCourses.map(course => course._id);
    const body = {
      courses: courses
    }
    const user = JSON.parse(localStorage.getItem("user"));
    this.props.handleUpdateStudentCourse(body, user.profile);
  }

  render() {
    const { courses, chosenCourses } = this.state;
    const { isLoading, isLoadingUpdate, msg_success, msg_fail } = this.props.studentAddCoursePage;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#fff', marginRight: '10px' }} spin />;

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
                  <div className='header-back'>
                    <Button style={{ border: 'none' }} onClick={this.navigateDashboard}>
                      <Icon type="arrow-left" />
                    </Button>
                    <p className="p"><b>Add Courses</b></p>
                  </div>
                  <WrappedSearchBar
                    message="Please enter your course name"
                    placeholder="I want to find my course"
                    type="ask"
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                  />
                </div>
              </div>
              <Content>
                <Row className="content-table">
                  <div className="chosen">
                    <div className='chosen-header'>
                      <h3 className="chosen-course" >{this.state.chosenCourses.length} CHOSEN COURSES</h3>
                      <div className='update-field'>
                        <p className={`text-${msg_success ? "success" : msg_fail ? "fail" : ""}`}>{msg_success ? msg_success : msg_fail ? msg_fail : ""}</p>
                        <Button className='btn-update-course' onClick={this.handleUpdateCourse}>{isLoadingUpdate ? <Spin indicator={antIcon} /> : 'UpdateCourse'}</Button>
                      </div>
                    </div>
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
                    <h3 className="chosen-other-course">ALL COURSES</h3>
                    <Table className="table-content-non"
                      columns={columns.columnToAdd}
                      dataSource={courses}
                      onRow={(record, rowIndex) => {
                        return {
                          onClick: e => this.addCourse(record, rowIndex)
                        }
                      }}
                      loading={isLoading}
                      // for pagination
                      pagination={{
                        onChange: (page) => { console.log(page) }
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
  fetchCourse: PropTypes.func.isRequired,
  // searchCourse: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentAddCoursePage: makeSelectStudentAddCoursePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCourse: () => { dispatch(loadCourse()) },
    fetchSearchCourse: (key) => { dispatch(searchCourse(key)) },
    handleUpdateStudentCourse: (courses, id) => { dispatch(updateCourse(courses, id)) }
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
