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
import { Layout, Col, Row, Table, Icon, Button, Input, Spin } from 'antd';
import WrappedSearchBar from '../../components/SearchBar';
import columns from './tableCols';
import { loadDepartment, createDepartment, deleteDepartment, updateDepartment } from './actions';
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
      isShow: false,
      error: "",
    }
  }

  componentDidMount() {
    this.props.handleLoadDepartment();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.departmentPage.departments !== this.props.departmentPage.departments &&
      prevProps.departmentPage.isLoadingDepartment !== this.props.departmentPage.isLoadingDepartment &&
      this.props.departmentPage.isLoadingDepartment === false
    ) {
      const departmentFomat = this.props.departmentPage.departments.map((department, index) => {
        return {
          ...department,
          key: index,
          activeSubject: department.courses.length,
        }
      })
      this.setState({
        departments: departmentFomat,
      })
    }

    if (prevProps.departmentPage.isLoadingDelete !== this.props.departmentPage.isLoadingDelete && this.props.departmentPage.isLoadingDelete === false) {
      // show modal success
      this.setState({
        isShow: true,
        isOpen: false,
        selectedDepartmnent: {},
        selectedRow: {},
        newDepartment: "",
      }, () => {
        this.timer1 = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
      this.props.handleLoadDepartment();
    }

    if (prevProps.departmentPage.isLoadingUpdate !== this.props.departmentPage.isLoadingUpdate && this.props.departmentPage.isLoadingUpdate === false) {
      // show modal success
      this.setState({
        isShow: true,
        isOpen: false,
        selectedDepartmnent: {},
        selectedRow: {},
        newDepartment: "",
      }, () => {
        this.timer1 = setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
      })
      this.props.handleLoadDepartment();
    }

    if (
      prevProps.departmentPage.isLoadingCreate !== this.props.departmentPage.isLoadingCreate &&
      this.props.departmentPage.isLoadingCreate === false &&
      this.props.departmentPage.errors
    ) {
      this.setState({
        error: this.props.departmentPage.errors
      })
    }

    if (
      prevProps.departmentPage.isLoadingCreate !== this.props.departmentPage.isLoadingCreate &&
      this.props.departmentPage.isLoadingCreate === false
    ) {
      // load again departments here 
      this.props.handleLoadDepartment();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer1);
  }

  onToggleInfo = (department, index) => {
    this.setState({
      isOpen: true,
      selectedDepartmnent: department,
      selectedRow: index,
      error: "",
      newDepartment: department.name
    })
  }

  onToggleBack = () => {
    this.setState({
      isOpen: false,
      selectedDepartmnent: {},
      selectedRow: {},
      error: "",
      newDepartment: "",
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
    if (newDepartment !== "") {
      const object = {
        name: newDepartment,
        description: newDepartment,
      }
      this.props.handleCreateDepartment(object);
      this.setState({
        newDepartment: ''
      })
    } else {
      this.setState({
        error: "Please fill the name of department",
      })
    }
  }

  onHandleDelete = () => {
    const { selectedDepartmnent } = this.state;
    this.props.handleDeleteDepartment(selectedDepartmnent._id);
  }

  onHandleUpdate = () => {
    const { selectedDepartmnent, newDepartment } = this.state;
    const object = {
      name: newDepartment,
      description: newDepartment,
    }
    console.log(object)
    this.props.handleUpdateDepartment(object, selectedDepartmnent._id);
  }

  render() {
    const { departments, selectedRow, isOpen, selectedDepartmnent, newDepartment, isShow, error } = this.state;
    const { isLoadingDepartment, isLoadingDelete, isLoadingCreate, message, isLoadingUpdate } = this.props.departmentPage;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#fff', marginRight: '10px' }} spin />;
    return (
      <Row className='department-page'>
        <Helmet>
          <title>DepartmentPage</title>
          <meta name="description" content="Description of DepartmentPage" />
        </Helmet>
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
        <Col span={19}>
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
              loading={isLoadingDepartment}
            />
            <div className={isShow ? 'notification-show' : 'notification'}>
              <div className='noti-content-success'>
                <span className='icon-noti accept-icon '></span>
                <p style={{ fontSize: '14px' }}>{message}</p>
              </div>
            </div>
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
                  <Input
                    placeholder="Add Department"
                    className="department-tile"
                    onChange={this.onHandleChangeInput}
                    value={newDepartment}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button className='info-finish' onClick={this.onHandleUpdate}>{
                      isLoadingUpdate ?
                        <Spin indicator={antIcon} /> :
                        <span>Update <span className='edit-mark'></span></span>
                    }</Button>
                    <Button className="info-delete" onClick={this.onHandleDelete}>
                      {
                        isLoadingDelete ?
                          <Spin indicator={antIcon} />
                          : <span>Delete <span className="icon-delete"></span></span>
                      }
                    </Button>
                  </div>
                  <div className="courses">
                    <div className="course-head">
                      <span className="course-icon"></span>
                      <p className="course-title">Courses</p>
                    </div>
                    <div>
                      <p>{`Currently tutoring ${selectedDepartmnent.activeSubject} courses`}</p>
                      <div className='course-wrapper'>
                        {
                          selectedDepartmnent.courses.map((course, index) => {
                            return (
                              <div className="course-name" key={index}>
                                <p className="course-code">{course.courseCode}</p>
                                <p className="course-fullname">{course.courseName}</p>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>

                </div>
                :
                <div className='filter-side'>
                  <Input
                    placeholder="Add Department"
                    className="add-department"
                    onChange={this.onHandleChangeInput}
                    value={newDepartment ? newDepartment : ""}
                  />
                  {
                    error && <div style={{ marginTop: '20px' }}><span style={{ color: 'red' }}>{error}</span></div>
                  }
                  <div style={{ display: 'flex', justifyContent: 'flex-end', margin: "30px 0" }}>
                    <Button className="department-add-btn" onClick={this.onHandleAddDepartment}>
                      {
                        isLoadingCreate ?
                          <Spin indicator={antIcon} /> :
                          <span>Add Departments <Icon type="plus" style={{ fontSize: '25px', color: "#fff", fontWeight: 600 }} /></span>
                      }
                    </Button>
                  </div>
                </div>
            }
          </div>
        </Col>
      </Row>
    );
  }
}

DepartmentPage.propTypes = {
  handleLoadDepartment: PropTypes.func.isRequired,
  handleDeleteDepartment: PropTypes.func.isRequired,
  handleCreateDepartment: PropTypes.func.isRequired,
  handleUpdateDepartment: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  departmentPage: makeSelectDepartmentPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleLoadDepartment: () => { dispatch(loadDepartment()) },
    handleDeleteDepartment: (id) => { dispatch(deleteDepartment(id)) },
    handleCreateDepartment: (department) => { dispatch(createDepartment(department)) },
    handleUpdateDepartment: (department, id) => { dispatch(updateDepartment(department, id)) },
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
