/**
 *
 * DepartmentPage
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
import makeSelectDepartmentPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './index.scss';
import { Layout, Col, Row, Table, Icon, Button, Input } from 'antd';
import WrappedSearchBar from '../../components/SearchBar';
import columns from './tableCols';
const { Header, Content } = Layout;

const mockData = [
  {
    id: 1,
    title: "Computer Science",
    activeCourse: [{}, {}, {}, {}, {}],
  },
  {
    id: 2,
    title: "Communication",
    activeCourse: [{}, {}, {}],
  },
  {
    id: 3,
    title: "Business",
    activeCourse: [{}, {}, {}, {}],
  },
]

/* eslint-disable react/prefer-stateless-function */
export class DepartmentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      isOpen: false,
      selectedRow: "",
      selectedDepartmnent: {},
      newDepartment: "",
    }
  }

  componentDidMount() {
    const departmentFomat = mockData.map((department, index) => {
      return {
        ...department,
        key: index,
        activeSubject: department.activeCourse.length,
      }
    })
    this.setState({
      departments: departmentFomat,
    })
  }

  onToggleInfo = (department, index) => {
    this.setState({
      isOpen: true,
      selectedDepartmnent: department,
      selectedRow: index
    })
  }

  onToggleBack = () => {
    this.setState({
      isOpen: false,
      selectedDepartmnent: {},
      selectedRow: {}
    })
  }

  onHandleChangeInput = (e) => {
    this.setState({
      newDepartment: e.target.value,
    })
  }

  onHandleAddDepartment = (e) => {
    e.preventDefault();
    const { newDepartment } = this.state;
    console.log(newDepartment)
    // load again departments here 
    // clear input here
  }

  render() {
    const { departments, selectedRow, isOpen, selectedDepartmnent, newDepartment } = this.state;
    return (
      <Row className='department-page'>
        <Helmet>
          <title>DepartmentPage</title>
          <meta name="description" content="Description of DepartmentPage" />
        </Helmet>
        <Col span={19}>
          <Header
            style={{
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: "space-between",
              alignItems: "center",
              height: '100px',
              paddingLeft: '0px',
            }}
          >
            <div className='department-page-name-wrapper'>
              <p className="department-page-name">Departments</p>
            </div>
            <WrappedSearchBar
              message="Please enter your department's name"
              placeholder="I want to find my departments"
              type="department"
            // handleSearch={this.handleSearch}
            // handleClear={this.handleClear}
            />
          </Header>
          <Content>
            <Table
              columns={columns}
              dataSource={departments}
              className="departmentTable"
              onRow={(record, rowIndex) => {
                return {
                  onClick: e => this.onToggleInfo(record, rowIndex)
                }
              }}
              rowClassName={(record, index) => {
                return index === selectedRow ? "active-row" : ""
              }}
            // loading={isLoading}
            />
          </Content>
        </Col>
        <Col span={5}>
          <div className='department-side'>
            {
              isOpen ?
                <div className="info-side">
                  <Button onClick={this.onToggleBack} className='info-back'>
                    <Icon type="arrow-left" style={{ fontSize: '25px', color: "#4b36de", fontWeight: 600 }} />
                  </Button>
                  <p className="department-tile">
                    {selectedDepartmnent.title}
                  </p>
                  <Button className='info-finish'>Finish <span className='icon-done-mark'></span></Button>
                  <div className="courses">
                    <div className="course-head">
                      <span className="course-icon"></span>
                      <p className="course-title">Courses</p>
                    </div>
                    <div>
                      <p>{`Currently tutoring ${selectedDepartmnent.activeSubject} courses`}</p>
                      {/* {
                          selectedDepartmnent.courses.map((course, index) => {
                            return (
                              <div className="course-name" key={index}>
                                <p>{course.courseName}</p>
                              </div>
                            )
                          })
                        } */}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', margin: "30px 0" }}>
                    <Button className="info-delete">Delete Departments <span className="icon-delete"></span></Button>
                  </div>
                </div>
                :
                <div className='filter-side'>
                  <form onSubmit={this.onHandleAddDepartment}>
                    <Input
                      placeholder="Add Department"
                      className="add-department"
                      onChange={this.onHandleChangeInput}
                      value={newDepartment ? newDepartment : ""}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', margin: "30px 0" }}>
                      <Button className="department-add-btn" onClick={this.onHandleAddDepartment}>Add Departments <Icon type="plus" style={{ fontSize: '25px', color: "#fff", fontWeight: 600 }} /></Button>
                    </div>
                  </form>
                </div>
            }
          </div>
        </Col>
      </Row>
    );
  }
}

DepartmentPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  departmentPage: makeSelectDepartmentPage(),
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

const withReducer = injectReducer({ key: 'departmentPage', reducer });
const withSaga = injectSaga({ key: 'departmentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DepartmentPage);
