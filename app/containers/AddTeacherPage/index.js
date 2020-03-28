/**
 *
 * AddTeacherPage
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Input, Icon, Table, Button } from 'antd';
import './addTeacher.scss';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAddTeacherPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import CourseInfo from './CourseInfo';
import { loadTeacher, searchTeacher } from './actions';
import WrappedSearchBar from '../../components/SearchBar';
import columns from './tableCol';

const { Content } = Layout;
/* eslint-disable react/prefer-stateless-function */

export class AddTeacherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      teachers: [],
      baseTeachers: [],
      selectedTeacher: {},
      selectedRow: "",
      chosenTeachers: [],
      isShowFolder: true
    }
  }

  componentDidMount() {
    this.props.fetchTeacher();
    const { course } = this.props.history.location.state;
    var chosenTeachers = course.teachers.map((teacher, index) => {
      return {
        ...teacher,
        key: `${index}`
      }
    })
    this.setState({
      chosenTeachers
    })
  }

  componentDidUpdate(prevProps) {
    const { course } = this.props.history.location.state;
    if (prevProps.addTeacherPage !== this.props.addTeacherPage) {
      const { teachers } = this.props.addTeacherPage;
      const formatTeachers = teachers.map((teacher, index) => {
        return {
          ...teacher,
          key: `${index}`
        }
      })

      this.setState({
        teachers: formatTeachers,
        baseTeachers: formatTeachers
      })

      // check duplicate teacher
      // if (course.teachers && course.teachers.length > 0) {
      //   var checkFormatTeachers = formatTeachers.filter(teacher => course.teachers.map(teacher => teacher._id).indexOf(teacher._id) === -1)
      //   this.setState({
      //     teachers: checkFormatTeachers,
      //     baseTeachers: formatTeachers,
      //   })
      // } else {
      //   this.setState({
      //     teachers: formatTeachers,
      //     baseTeachers: formatTeachers,
      //   })
      // }
    }
  }

  addTeacher = (teacherOfRow, rowIndex) => {
    const { chosenTeachers, teachers } = this.state;

    //remove teacher about to be added from "Others Teacher" list 
    // const teacherLeft = teachers.filter((teacherCurrent) => {
    //   return teacherCurrent.key != teacherOfRow.key
    // })

    if(!chosenTeachers.some((teacher) => {return teacher._id == teacherOfRow._id})) {
      //push teacher into chosen teacher list
      chosenTeachers.push(teacherOfRow);

      this.setState({
        chosenTeachers: chosenTeachers
        // teachers: teacherLeft
      })
    }


  }

  removeTeacher = (teacherOfRow, rowIndex) => {
    const { chosenTeachers, teachers } = this.state;

    //remove teacher about to be removed from "Added Teacher" list 
    const teacherLeft = chosenTeachers.filter((teacherCurrent) => {
      return teacherCurrent.key != teacherOfRow.key
    })

    //push teacher into Other Teachers list
    // teachers.push(teacherOfRow);

    this.setState({
      chosenTeachers: teacherLeft,
      // teachers: teachers
    })
  }

  navigateAddCourse = () => {
    const { chosenTeachers } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "/course/addcourse",
      state: {
        course: {
          ...history.location.state.course,
          teachers: chosenTeachers,
        },
        type: history.location.state.type,
        from: history.location.state.from,
      }
    })
  }

  handleSearch = (key) => {
    this.props.fetchSearchTeacher(key)
  }

  handleClear = () => {
    this.props.fetchTeacher();
  }

  handleShowFolder = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isShowFolder: !prevState.isShowFolder
      }
    })
  }

  render() {
    const { teachers, chosenTeachers, isShowFolder } = this.state;
    const { course } = this.props.history.location.state;
    const { isLoading } = this.props.addTeacherPage;
    return (
      <div>
        <Row className="addTeacher">
          <Helmet>
            <title>AddTeacherPage</title>
            <meta name="description" content="Description of AddTeacherPage" />
          </Helmet>
          <Col span={24}>
            <Layout>
              <div className="header">
                <div className="header-back">
                  <Button style={{ border: 'none' }} onClick={this.navigateAddCourse}>
                    <Icon type="arrow-left" />
                  </Button>
                  <p className="p"><b>Add Teachers</b></p>
                </div>
                <WrappedSearchBar
                  message="Please enter your teacher's name"
                  placeholder="I want to find teachers"
                  type="home"
                  handleSearch={this.handleSearch}
                  handleClear={this.handleClear}
                />
              </div>
              <Content>
                <Row className="content-table">
                {/*}
                  <div className="chosen">
                    <Button className='chosen-title-btn' onClick={this.handleShowFolder}>
                      <h3 className="chosen-teacher" >{this.state.chosenTeachers.length} CHOSEN TUTORS</h3>
                      {isShowFolder ? <Icon type="down" style={{ color: '#111' }} /> : <Icon type="up" style={{ color: '#111' }} />}
                    </Button>
                    {
                      isShowFolder ?
                        chosenTeachers && chosenTeachers.length > 0 ?
                          <Table className="table-content"
                            columns={columns.columnToRemove}
                            dataSource={chosenTeachers}
                            onRow={(record, rowIndex) => {
                              return {
                                onClick: e => this.removeTeacher(record, rowIndex)
                              }
                            }}
                          />
                          : <p>No data</p>
                        : ""
                    }
                  </div>
                  */}
                  <Col span={18}>
                    <div className="table-wrapper">
                      <Table className="table-content"
                        columns={columns.columnToAdd}
                        dataSource={teachers}
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: e => this.addTeacher(record, rowIndex)
                          }
                        }}
                        loading={isLoading}
                      />
                    </div>
                    </Col>

                    <Col span={6}>
                      <div className="chosen">
                        <p className="chosen-title"> 0{this.state.chosenTeachers.length} SELECTED COURSES </p>
                        <div className="courses">
                          
                          {
                            chosenTeachers.map((teacher, index) => {
                              return ( 
                                <div key={index} className="course-item">
                                  <svg id="exit" data-name="exit" onClick={() => this.removeTeacher(teacher)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <g>
                                      <path id="Path_132" data-name="Path 132" d="M14.222,0H1.778A1.777,1.777,0,0,0,0,1.778V5.333H1.778V1.778H14.222V14.222H1.778V10.667H0v3.556A1.777,1.777,0,0,0,1.778,16H14.222A1.777,1.777,0,0,0,16,14.222V1.778A1.777,1.777,0,0,0,14.222,0Z" fill="#f44336"/>
                                      <path id="Path_133" data-name="Path 133" d="M6.3,92.964l1.258,1.258L12,89.777,7.556,85.333,6.3,86.591l2.3,2.3H0v1.778H8.6Z" transform="translate(0 -81.777)" fill="#f44336"/>
                                    </g>
                                  </svg>
                                  <div className="course-code">
                                  <img src={teacher.avatar} alt="avatar" />
                                    <span >{teacher.name}</span>
                                  </div>
                                  <span className="course-name">{teacher.email}</span>
                                </div>
                              )
                            
                            })
                          }
                            
                        </div>
                      </div>
                  </Col>
                </Row>
              </Content>
            </Layout>
          </Col>
          {/*
          <Col span={5}>
            <CourseInfo course={course} />
          </Col>
          */}
        </Row>
      </div>
    );
  }
}

AddTeacherPage.propTypes = {
  fetchTeacher: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addTeacherPage: makeSelectAddTeacherPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTeacher: () => { dispatch(loadTeacher()) },
    fetchSearchTeacher: (key) => { dispatch(searchTeacher(key)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addTeacherPage', reducer });
const withSaga = injectSaga({ key: 'addTeacherPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddTeacherPage);
