/**
 *
 * AddTeacherPage
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {Layout, Row, Col, Input, Icon, Table} from 'antd';
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
import columns from './teacherCol';
import CourseInfo from './CourseInfo';
const { Search} = Input;

const { Header, Content } = Layout;
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
        chosenTeacher:[],
      }
    }

    componentDidMount() {
      const formatTeachers = mockData.map((teacher, index) => {
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
  render() {
    const {teachers, selectedTeacher, selectedRow } = this.state;
    const { chosenTeacher } = this.state;
    return (
      <div>
        <Row className="addTeacher">
          <Helmet>
          <title>AddTeacherPage</title>
          <meta name="description" content="Description of AddTeacherPage" />
        </Helmet>
        <Col span={19}>
          <Layout>
            <Header className="header">
              <div className="header1">
                <Link to="/addcourse">
                  <Icon type="arrow-left"/>
                </Link>
                <p className="p"><b>Add Teachers</b></p>
              </div>
              <Search className="search-teacher"
                name='search-teacher'
                placeholder="Search for teachers"
                />
            </Header>
            <Content>
              <Row className="content-table">
                <div className="chosen">
                  <h3 className="chosen-teacher" >{this.state.chosenTeacher.length} CHOSEN TUTORS<Icon type="up" /></h3>
                  <Table className="table-content"
                      columns={columns}
                      dataSource={teachers}            
                />
                </div>
                <div className="chosen-other">
                  <h3 className="chosen-teacher" >OTHERS<Icon type="up" /></h3>
                </div>
                </Row>
            </Content>
          </Layout>
        </Col>
                <Col span={5} className='course'>
                  <CourseInfo/>
                </Col>
        </Row>
      </div>
    );
  }
}

AddTeacherPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addTeacherPage: makeSelectAddTeacherPage(),
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

const withReducer = injectReducer({ key: 'addTeacherPage', reducer });
const withSaga = injectSaga({ key: 'addTeacherPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddTeacherPage);
