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
import { Row, Table, Col, Button,Icon , Layout} from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectStudentDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import columns from './tableCol'
import './index.scss'


const cousesData = [
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
},
{
    "departments": [
        "computer",
        "business",
        "design"
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
        },
        {
            "rating": {
                "star_1": 2,
                "star_2": 3,
                "star_3": 4,
                "star_4": 5,
                "star_5": 6
            },
            "courses": [],
            "_id": "5e4eab447c213e67373d414a",
            "teacherName": "First",
            "email": "first@fpt.edu.vn",
            "gender": "male",
            "avatar": "https://i.imgur.com/DPSSSkb.png",
            "isActive": false
        }
    ],
    "_id": "5e5480cfa216a7000434e02b",
    "courseName": "CHECK DEMO UPDATE",
    "courseCode": "LAB201",
    "shortDes": "this is demo 12313",
    "fullDes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "courseURL": "fb.com",
    "dateCreated": "25/02/2020",
    "__v": 0
}
]

/* eslint-disable react/prefer-stateless-function */
export class StudentDashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      displayCourse: {}
    }
  }

  componentDidMount() {
    this.setState({
      courses: cousesData
    })
  }
  render() {
    const {courses, displayCourse} = this.state;
    
    return (
      <div className="student-dashboard-page">
        <Helmet>
          <title>StudentDashboardPage</title>
          <meta
            name="description"
            content="Description of StudentDashboardPage"
          />
        </Helmet>
        <h1>Hi there. Let's get our day started!</h1>
        <Row gutter={24}>
          <Col span={8}>
            <div className="card bg-yellow">
              <div className="card__info">
                <span className="card__info--note-icon">Notes</span>
              </div>
              <span className="number">3</span>
            </div>
          </Col>   
          <Col span={8}>
              <div className="card bg-green">
                <div className="card__info">
                  <span className="card__info--highlight-icon">Highlights</span>
                </div>
                <span className="number">3</span>
              </div>
          </Col>
          <Col span={8}>
            <div className="card bg-blue">
              <div className="card__info">
                <span className="card__info--ask-icon">Aks your tutors</span>
              </div>
              <span className="number">3</span>
            </div>
          </Col>
        </Row>

        <Row className="courses-info-wrapper">
          <Col span={12} className="courses-info">
            <div className="course-info-header">
              <div className="table-title">
                <svg enableBackground="new 0 0 514.56 514.56" version="1.1" viewBox="0 0 514.56 514.56" xmlns="http://www.w3.org/2000/svg">
                  <path d="m499.2 335.97h-12.8v-284.16c0-12.8-10.24-23.04-25.6-23.04h-176.64l-2.56-10.24c-2.56-10.24-12.8-17.92-25.6-17.92s-20.48 5.12-25.6 17.92l-2.56 10.24h-176.64c-15.36 0-25.6 10.24-25.6 23.04v284.16h-12.8c-7.68 0-12.8 5.12-12.8 12.8v25.6c0 7.68 5.12 12.8 12.8 12.8h97.28l-30.72 94.72c-5.12 12.8 5.12 28.16 17.92 30.72 12.8 5.12 28.16-5.12 30.72-17.92l35.84-110.08h186.88l35.84 110.08c7.68 23.04 28.16 17.92 30.72 17.92 12.8-5.12 20.48-17.92 17.92-30.72l-30.72-94.72h97.28c7.68 0 12.8-5.12 12.8-12.8v-25.6c-2.56-7.68-7.68-12.8-15.36-12.8zm-166.4-76.8h-230.4c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6h230.4c15.36 0 25.6 10.24 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6zm76.8-102.4h-307.2c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6h307.2c15.36 0 25.6 10.24 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6z"/>
                </svg>
                Courses
              </div>
              <Button className="addBtn" onClick={e => this.props.history.push({
                    pathname: "/student/addcourse"
                  })}>
                <Icon type="plus" />
                Add course
              </Button>
              
            </div>
            <Table
            key="_id"
            pagination={false} 
            columns={columns}
            dataSource={courses}
            className="ask-table"
            onRow={(record, rowIndex) => {
              return {
                onClick: e => this.setState({displayCourse : record})
              }
            }}
          />
          </Col>

          <Col span={12} className="course-detail-wrapper">
            {
              displayCourse._id ?
              <div>
                <p className="course-code">{displayCourse.courseCode}</p>
                <h2>{displayCourse.courseName}</h2>
                <Button className="btn btn--go" onClick={this.handleSubmit}>
                  Go to course 
                  <Icon type="arrow-right" />
                </Button>
                <div className="course-detail">
                    <h3>DEPARTMENT</h3>
                    <p>{displayCourse.departments}</p>
                    <h3>SHORT DESCRIPTION</h3>
                    <p>{displayCourse.shortDes}</p>
                    <h3>FULL DESCRIPTION</h3>
                    <p>{displayCourse.fullDes}</p>
                </div>
                <Button className="btn btn--exit" type="danger" onClick={this.handleSubmit}>
                  Exit course
                  <Icon type="logout" />
                </Button>
              </div>
              :
              ''
            }
          </Col>
        </Row>
      </div>
    );
  }
}

StudentDashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  studentDashboardPage: makeSelectStudentDashboardPage(),
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

const withReducer = injectReducer({ key: 'studentDashboardPage', reducer });
const withSaga = injectSaga({ key: 'studentDashboardPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(StudentDashboardPage);
