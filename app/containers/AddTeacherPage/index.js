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
    rating: 3,
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
    rating: 2,
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
        teacheradded:[],
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

    addedTeacher= ()=>{
      const newArr = mockData.filter(teacher => teacher.teacher)
      this.setState({
        chosenTeacher: newArr
      })
    }

  render() {
    const colunms = [
    {
        dataIndex: "key",
        width: 50,
    },
    {
        title: "TEACHER" ,
        dataIndex: "teacher",
        sorter: (a, b) => a.teacher > b.teacher,
        sortDirections: ['ascend'],
        render: text => <span style={{ color: '#b9754e', fontWeight: 600 }}>{text}</span>,
    },
    {
        title: "E-MAIL",
        dataIndex: "mail",
    },
    {
        title: "COURSES IN CHARGE",
        dataIndex: "courses",
        render: (record) => <span>{record.length} courses</span>,
    },
    {
        title: "RATING",
        dataIndex: "rating",
        render: text => <div><span>{text}</span><span className="icon star-icon"></span>
        
        </div>,
        width: 100
    },
    {
        render: (record) => <button onClick={()=>{}}>
            <Icon type="plus" className="icon-plus" 
            style={{padding: '3px 5px', color:'#F44336', float:'right'}}/>  
        </button>,
        width: 10
    }
];

  const colunms2 = [
    {
        dataIndex: "key",
        width: 50,
    },
    {
        title: "TEACHER" ,
        dataIndex: "teacher",
        sorter: (a, b) => a.teacher > b.teacher,
        sortDirections: ['ascend'],
        render: text => <span style={{ color: '#b9754e', fontWeight: 600 }}>{text}</span>,
    },
    {
        title: "E-MAIL",
        dataIndex: "mail",
    },
    {
        title: "COURSES IN CHARGE",
        dataIndex: "courses",
        render: (record) => <span>{record.length} courses</span>,
    },
    {
        title: "RATING",
        dataIndex: "rating",
        render: text => <div><span>{text}</span><span className="icon star-icon"></span>
        
        </div>,
        width: 100
    },
    {
        render: (record) => <button onClick={()=>{}}>
            <Icon type="minus" className="icon-minus" 
            style={{padding: '3px 5px', color:'#F44336', float:'right'}}/>  
        </button>,
        width: 10
    }
];

    const {teachers, teacheradded} = this.state;
    return (
      <div>
        <Row className="addTeacher">
          <Helmet>
          <title>AddTeacherPage</title>
          <meta name="description" content="Description of AddTeacherPage" />
        </Helmet>
        <Col span={19}>
          <Layout>
            <div className="header">
              <div className="header1">
                <Link to="/addcourse">
                  <Icon type="arrow-left"/>
                </Link>
                <p className="p"><b>Add Teachers</b></p>
              </div>
              <Input className="search-teacher"
                name='search-teacher'
                placeholder="Search for teachers"
                prefix={<Icon type="search" style={{color: '#9C4AEE'}}/>}
                />
            </div>
            <Content>
              <Row className="content-table">
                <div className="chosen">
                  <h3 className="chosen-teacher" >{this.state.chosenTeacher.length} CHOSEN TUTORS<Icon type="up" /></h3>
                  <Table className="table-content"
                      columns={colunms2}
                      dataSource={teachers}            
                />
                </div>
                <div className="chosen-other">
                  <h3 className="chosen-teacher" >OTHERS<Icon type="up" /></h3>
                  <Table className="table-content-non"
                      columns={colunms}
                      dataSource={teachers}
                />
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
