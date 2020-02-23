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
import { loadTeacher } from './actions';
import columns from './tableCol';

const { Content } = Layout;
/* eslint-disable react/prefer-stateless-function */

const mockData = [{
  teacher: "LamPD",
  mail: "lampd@fe.edu.vn",
  departments: ['Communication Business', 'New Category', 'Communication'],
  courses: ["ECO101", "ASD203", "DBW231"],
  rating: 2.4,
  isActive: true,
},
{
  teacher: "MaiTT",
  mail: "maitt6@fe.edu.vn",
  departments: ['Communication'],
  courses: ["ECO101", "ASD203", "DBW231"],
  rating: 1,
  isActive: true,
},
{
  teacher: "MaiVTT",
  mail: "maitt@fe.edu.vn",
  departments: ['Computer Science'],
  courses: ["ECO101", "ASD203", "DBW231"],
  rating: 1,
  isActive: true,
},
{
  teacher: "PhuongLh7",
  mail: "phuonglh7@fe.edu.vn",
  departments: ['Communication'],
  courses: ["ECO101", "ASD203", "DBW231"],
  rating: 1,
  isActive: true,
},
];

const mockData2 = [
  "Business", "Communication Business", "Communication", "Finance", "Graphic Design"
];

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
    }
  }

  componentDidMount() {
    this.props.fetchTeacher();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addTeacherPage !== this.props.addTeacherPage) {
      const { teachers } = this.props.addTeacherPage;
      const formatTeachers = teachers.map((teacher, index) => {
        return {
          ...teacher,
          key: `${index}`
        }
      })
      this.setState({
        departments: mockData2,
        teachers: formatTeachers,
        baseTeachers: formatTeachers,
      })
    }
  }

  addTeacher = (teacherOfRow, rowIndex) => {
    const { chosenTeachers, teachers } = this.state;

    //remove teacher about to be added from "Others Teacher" list 
    const teacherLeft = teachers.filter((teacherCurrent) => {
      return teacherCurrent.key != teacherOfRow.key
    })

    //push teacher into chosen teacher list
    chosenTeachers.push(teacherOfRow);

    this.setState({
      chosenTeachers: chosenTeachers,
      teachers: teacherLeft
    })
  }

  removeTeacher = (teacherOfRow, rowIndex) => {
    const { chosenTeachers, teachers } = this.state;

    //remove teacher about to be removed from "Added Teacher" list 
    const teacherLeft = chosenTeachers.filter((teacherCurrent) => {
      return teacherCurrent.key != teacherOfRow.key
    })

    //push teacher into Other Teachers list
    teachers.push(teacherOfRow);

    this.setState({
      chosenTeachers: teacherLeft,
      teachers: teachers
    })
  }

  handleSearchInput = (event) => {
    const { baseTeachers } = this.state;
    const value = event.target.value;
    const searchTeacher = baseTeachers.filter((teacher, index) => {
      return teacher.teacher.includes(value) || teacher.mail.includes(value)
    });

    this.setState({
      teachers: searchTeacher
    })
  }

  navigateAddCourse = () => {
    const { chosenTeachers } = this.state;
    const { history } = this.props;
    history.push({
      pathname: "/addcourse",
      state: {
        chosenTeachers: chosenTeachers
      }
    })
  }

  render() {
    const { teachers, chosenTeachers } = this.state;
    const { isLoading } = this.props.addTeacherPage;
    return (
      <div>
        <Row className="addTeacher">
          <Helmet>
            <title>AddTeacherPage</title>
            <meta name="description" content="Description of AddTeacherPage" />
          </Helmet>
          <Col span={19} style={{ padding: '28px 0px 28px 50px' }}>
            <Layout>
              <div className="header">
                <div className="header1">
                  {/* <Link to="/addcourse">
                    <Icon type="arrow-left" />
                  </Link> */}
                  <Button style={{border: 'none'}} onClick={this.navigateAddCourse}>
                    <Icon type="arrow-left" />
                  </Button>
                  <p className="p"><b>Add Teachers</b></p>
                </div>
                <Input className="search-teacher"
                  name='search-teacher'
                  placeholder="Search for teachers"
                  onKeyUp={this.handleSearchInput}
                  prefix={<Icon type="search" style={{ color: '#9C4AEE' }} />}
                />
              </div>
              <Content>
                <Row className="content-table">
                  <div className="chosen">
                    <h3 className="chosen-teacher" >{this.state.chosenTeachers.length} CHOSEN TUTORS<Icon type="up" /></h3>
                    {chosenTeachers && chosenTeachers.length > 0 ?
                      <Table className="table-content"
                        columns={columns.columnToRemove}
                        dataSource={chosenTeachers}
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: e => this.removeTeacher(record, rowIndex)
                          }
                        }}
                      />
                      :
                      <p>No data</p>
                    }
                  </div>
                  <div className="chosen-other">
                    <h3 className="chosen-other-teacher">OTHERS<Icon type="up" /></h3>
                    <Table className="table-content-non"
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
                </Row>
              </Content>
            </Layout>
          </Col>
          <Col span={5} className='course'>
            <CourseInfo />
          </Col>
        </Row>
      </div>
    );
  }
}

AddTeacherPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addTeacherPage: makeSelectAddTeacherPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTeacher: () => { dispatch(loadTeacher()) }
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
