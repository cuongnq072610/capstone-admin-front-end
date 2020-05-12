/**
 *
 * StudentDashboardPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Table, Col, Button, Icon, Layout, Spin } from 'antd';
import WrappedSearchBar from '../../components/SearchBar';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import columns from './tableCol'
import './index.scss'
import { loadStudentInfo, loadStudentStatistic, loadExitCourse } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class StudentDashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      displayCourse: {},
      user: {},
      statistic: {},
      hasExtension: true
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.props.handleFetchStudent(user.profile);
    this.props.handleFetchStatistic(user.profile);

    //check extension exist
    let noteitDom = document.getElementById('noteitContainer');
    console.log(noteitDom);
    if(noteitDom) {
      this.setState({hasExtension: true});
    }else {
      this.setState({hasExtension: false});
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.studentDashboardPage.user !== this.props.studentDashboardPage.user &&
      this.props.studentDashboardPage.isLoading !== prevProps.studentDashboardPage.isLoading &&
      this.props.studentDashboardPage.isLoading === false
    ) {
      const { user } = this.props.studentDashboardPage;
      const courses = user.courses.map((item, index) => {
        return {
          ...item,
          key: index,
        }
      })
      this.setState({
        courses,
        user,
      })
    }
    if (prevProps.studentDashboardPage.statistic !== this.props.studentDashboardPage.statistic) {
      const { statistic } = this.props.studentDashboardPage;
      this.setState({
        statistic,
      })
    }
  }

  handleCloseCourseInfo = () => {
    this.setState({
      displayCourse: {}
    })
  }

  handleGoToCourse = (url) => {
    window.open(url, '_blank')
  }

  handleExitCourse = () => {
    const { displayCourse } = this.state;
    this.props.handleExitCourse(displayCourse._id);
    this.handleCloseCourseInfo();
  }

  render() {
    const { courses, displayCourse, user, statistic, hasExtension } = this.state;
    const { isLoading, isLoadingStatistic } = this.props.studentDashboardPage;
    const fomatDepartment = (departments) => {
      return departments.map((item, index) => {
        return index !== departments.length - 1 ? item + " - " : item
      })
    }
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#fff', marginRight: '10px' }} spin />;
    return (
      <div className="student-dashboard-page">
        <Helmet>
          <title>StudentDashboardPage</title>
          <meta
            name="description"
            content="Description of StudentDashboardPage"
          />
        </Helmet>
        <Row className="card-wrapper" gutter={24}>
          <Col span={8}>
            <Button className="card bg-yellow" onClick={() => this.props.history.push('/note')}>
              <div className="card__info">
                <span className="card__info--note-icon">Notes</span>
              </div>
              <span className="number">{isLoadingStatistic ? <Spin indicator={antIcon} /> : statistic.noteNumber}</span>
            </Button>
          </Col>
          <Col span={8}>
            <Button className="card bg-green" onClick={() => this.props.history.push('/highlight')}>
              <div className="card__info">
                <span className="card__info--highlight-icon">Highlights</span>
              </div>
              <span className="number">{isLoadingStatistic ? <Spin indicator={antIcon} /> : statistic.highlightNumber}</span>
            </Button>
          </Col>
          <Col span={8}>
            <Button className="card bg-blue" onClick={() => this.props.history.push('/ask')}>
              <div className="card__info">
                <span className="card__info--ask-icon">Ask your tutors</span>
              </div>
              <span className="number">{isLoadingStatistic ? <Spin indicator={antIcon} /> : statistic.askNumber}</span>
            </Button>
          </Col>
        </Row>

        <Row className="courses-info-wrapper">
          <Col span={12} className="courses-info">
            <div className="course-info-header">
              <div className="table-title">
                <svg enableBackground="new 0 0 514.56 514.56" version="1.1" viewBox="0 0 514.56 514.56" xmlns="http://www.w3.org/2000/svg">
                  <path d="m499.2 335.97h-12.8v-284.16c0-12.8-10.24-23.04-25.6-23.04h-176.64l-2.56-10.24c-2.56-10.24-12.8-17.92-25.6-17.92s-20.48 5.12-25.6 17.92l-2.56 10.24h-176.64c-15.36 0-25.6 10.24-25.6 23.04v284.16h-12.8c-7.68 0-12.8 5.12-12.8 12.8v25.6c0 7.68 5.12 12.8 12.8 12.8h97.28l-30.72 94.72c-5.12 12.8 5.12 28.16 17.92 30.72 12.8 5.12 28.16-5.12 30.72-17.92l35.84-110.08h186.88l35.84 110.08c7.68 23.04 28.16 17.92 30.72 17.92 12.8-5.12 20.48-17.92 17.92-30.72l-30.72-94.72h97.28c7.68 0 12.8-5.12 12.8-12.8v-25.6c-2.56-7.68-7.68-12.8-15.36-12.8zm-166.4-76.8h-230.4c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6h230.4c15.36 0 25.6 10.24 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6zm76.8-102.4h-307.2c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6h307.2c15.36 0 25.6 10.24 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6z" />
                </svg>
                Courses
              </div>
              <div className="search-bar">
                <Button className="addBtn" onClick={e => this.props.history.push({
                  pathname: "/student/addcourse",
                  state: {
                    stuCourses: courses,
                  }
                })}>
                  <Icon type="plus" />
                </Button>
              </div>
            </div>
            <Table
              key="_id"
              pagination={false}
              columns={columns}
              dataSource={courses}
              className="ask-table"
              onRow={(record, rowIndex) => {
                return {
                  onClick: e => this.setState({ displayCourse: record })
                }
              }}
              loading={isLoading}
            />
          </Col>

          <Col span={12} >
            {
              displayCourse._id ? (
                <div className="course-detail-wrapper">
                  <div className='course-header'>
                    <p className="course-code">{displayCourse.courseCode}</p>
                    <button className='btn-close' onClick={this.handleCloseCourseInfo}>X</button>
                  </div>
                  <h2>{displayCourse.courseName}</h2>
                  <Button className="btn btn--go" onClick={() => this.handleGoToCourse(displayCourse.courseURL)}>
                    Go to course
                    <Icon type="arrow-right" />
                  </Button>
                  <div className="course-detail">
                    <h3>DEPARTMENT</h3>
                    <p>{fomatDepartment(displayCourse.departments)}</p>
                    <h3>SHORT DESCRIPTION</h3>
                    <p>{displayCourse.shortDes}</p>
                    <h3>FULL DESCRIPTION</h3>
                    <p>{displayCourse.fullDes}</p>
                  </div>
                  <Button className="btn btn--exit" type="danger" onClick={this.handleExitCourse}>
                    Exit course
                    <Icon type="logout" />
                  </Button>
                </div>
              ) :
                (
                  <div className="hello-user">
                    <h1>Hi {user.name}. How are you today?</h1>
                  </div>
                )
            }
          </Col>
        </Row>
        {
          !hasExtension ?
          <div id="extension_notify">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999"><path d="M501.45 368.914L320.566 66.207C306.75 43.384 282.728 29.57 256 29.57s-50.752 13.815-64.567 36.638L10.55 368.914c-13.812 23.725-14.113 51.954-.6 75.678s37.836 37.838 65.165 37.838h361.766c27.33 0 51.653-14.115 65.165-37.838s13.215-51.953-.598-75.678z" fill="#e50027"/><path d="M502.05 444.592c-13.513 23.723-37.836 37.838-65.165 37.838H256V29.57c26.727 0 50.752 13.815 64.567 36.638L501.45 368.915c13.812 23.724 14.113 51.953.6 75.677z" fill="#c1001f"/><path d="M75.11 452.4c-16.628 0-30.85-8.27-39.063-22.67-8.21-14.414-8.065-31.087.47-45.72L217.23 81.55c8.27-13.666 22.816-21.95 38.77-21.95s30.5 8.284 38.887 22.157l180.745 302.5c8.388 14.4 8.534 31.072.322 45.485-8.21 14.4-22.435 22.67-39.063 22.67H75.11z" fill="#fd003a"/><path d="M436.89 452.4c16.628 0 30.85-8.27 39.063-22.67 8.21-14.414 8.065-31.087-.322-45.485L294.886 81.754c-8.388-13.87-22.933-22.157-38.887-22.157V452.4H436.89z" fill="#e50027"/><path d="M286.03 152.095v120.122c0 16.517-13.514 30.03-30.03 30.03s-30.03-13.514-30.03-30.03V152.095c0-16.517 13.514-30.03 30.03-30.03s30.03 13.514 30.03 30.03z" fill="#e1e4fb"/><path d="M286.03 152.095v120.122c0 16.517-13.514 30.03-30.03 30.03V122.064c16.516 0 30.03 13.514 30.03 30.03z" fill="#c5c9f7"/><path d="M256 332.278c-24.926 0-45.046 20.12-45.046 45.046A44.99 44.99 0 0 0 256 422.37c24.927 0 45.046-20.12 45.046-45.046A44.99 44.99 0 0 0 256 332.278z" fill="#e1e4fb"/><path d="M301.046 377.323A44.99 44.99 0 0 1 256 422.369v-90.09a44.99 44.99 0 0 1 45.046 45.045z" fill="#c5c9f7"/></svg>
            <div className="notify_content">
                <h3>Please activate noteit extension</h3>
                <p>It looks like you have turned off the extension.
                Activate it to get the best from your lessons.</p>
            </div>
          </div>
          :
          ''
        }
        
      </div>
    );
  }
}

StudentDashboardPage.propTypes = {
  handleFetchStudent: PropTypes.func.isRequired,
  handleFetchStatistic: PropTypes.func.isRequired,
  handleExitCourse: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentDashboardPage: makeSelectStudentDashboardPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleFetchStudent: (id) => { dispatch(loadStudentInfo(id)) },
    handleFetchStatistic: (id) => { dispatch(loadStudentStatistic(id)) },
    handleExitCourse: (courseId) => { dispatch(loadExitCourse(courseId)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'studentDashboardPage', reducer });
const withSaga = injectSaga({ key: 'studentDashboardPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentDashboardPage);
