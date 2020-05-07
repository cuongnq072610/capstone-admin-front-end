/**
 *
 * TeacherDashboardPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTeacherDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Row, Col, Table, Icon, Spin, Button } from 'antd';
import './index.scss';
import columns from './tableCol';
import { getStatistic } from './actions';


/* eslint-disable react/prefer-stateless-function */
export class TeacherDashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCourse: "",
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(`go here ${user.profile}`)
    this.props.handleLoadStatistic(user.profile);
  }

  handleGoToCourse = (url) => {
    window.open(url, '_blank')
  }

  handleCloseCourseInfo = () => {
    this.setState({
      displayCourse: ""
    })
  }

  render() {
    const { isLoading, statistic } = this.props.teacherDashboardPage;
    const { displayCourse } = this.state;
    const fomatDepartment = (departments) => {
      return departments.map((item, index) => {
        return index !== departments.length - 1 ? item + " - " : item
      })
    }
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#fff', marginRight: '10px' }} spin />;
    return (
      <div className='teacher-dashboard-page'>
        <Helmet>
          <title>TeacherDashboardPage</title>
          <meta
            name="description"
            content="Description of TeacherDashboardPage"
          />
        </Helmet>
        <Row className="card-wrapper" gutter={24}>
          <Col span={8}>
            <div className="card bg-yellow">
              <div className="card__info">
                <span className="card__info--note-icon">Total Questions</span>
              </div>
              <span className="number">{isLoading ? <Spin indicator={antIcon} /> : statistic.totalQuestion}</span>
            </div>
          </Col>
          <Col span={8}>
            <div className="card bg-green">
              <div className="card__info">
                <span className="card__info--highlight-icon">Opened Questions</span>
              </div>
              <span className="number">{isLoading ? <Spin indicator={antIcon} /> : statistic.openQuestion}</span>
            </div>
          </Col>
          <Col span={8}>
            <div className="card bg-blue">
              <div className="card__info">
                <span className="card__info--ask-icon">Closed Questions</span>
              </div>
              <span className="number">{isLoading ? <Spin indicator={antIcon} /> : statistic.closedQuestion}</span>
            </div>
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
            </div>
            <Table
              key="_id"
              pagination={true}
              columns={columns}
              dataSource={statistic.courses}
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
                </div>
              ) :
                (
                  <div className="hello-user">
                    <h1>Hi. How are you today?</h1>
                  </div>
                )
            }
          </Col>
        </Row>
      </div>
    );
  }
}

TeacherDashboardPage.propTypes = {
  handleLoadStatistic: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teacherDashboardPage: makeSelectTeacherDashboardPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleLoadStatistic: (id) => { dispatch(getStatistic(id)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'teacherDashboardPage', reducer });
const withSaga = injectSaga({ key: 'teacherDashboardPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TeacherDashboardPage);
