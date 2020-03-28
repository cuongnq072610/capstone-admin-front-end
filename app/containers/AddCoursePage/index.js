/**
 *
 * AddCoursePage
 *
 */
import { Link } from 'react-router-dom';
import './addCourse.scss';
import { Select, Layout, Row, Col, Input, Icon, Form, Button, Spin } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { isEmpty as _isEmpty, uniq as _isUniq } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAddCoursePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import SearchTeacher from '../../components/SearchTeacher';
import history from '../../utils/history';
import { addCourse, updateCourse, loadDepartment, deleteCourse } from './actions';
import { isRequired } from '../../utils/validation';

/* eslint-disable react/prefer-stateless-function */
import Teacher from './teacher';
import { Fragment } from 'react';

const { TextArea } = Input;
const { Option } = Select;
const { Header, Content } = Layout;

export class AddCoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        courseName: '',
        courseCode: '',
        departments: [],
        shortDes: '',
        fullDes: '',
        courseURL: '',
        teachers: [],
      },
      type: '',
      isShow: false,
      invalidField: [],
      errMess: [],
      departmentOption: [],
      from: "",
    };
  }

  componentDidMount() {
    this.props.handleFetchDepartment();
    const { state } = history.location;
    if (state) {
      if (state.course) {
        this.setState({
          course: state.course,
          type: state.type,
          from: state.from ? state.from : '/course',
        })
      } else {
        this.setState({
          type: state.type,
          from: state.from ? state.from : '/course',
        })
      }
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.addCoursePage.isDone !== this.props.addCoursePage.isDone && this.props.addCoursePage.isDone === true) {
      this.props.history.push({
        pathname: '/course',
        state: {
          isDone: true
        }
      })
    }
    if (prevProps.addCoursePage.errors !== this.props.addCoursePage.errors) {
      this.setState({
        isShow: true
      }, () => {
        setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 5000)
      })
    }
    if (prevProps.addCoursePage.departments !== this.props.addCoursePage.departments) {
      this.setState({
        departmentOption: this.props.addCoursePage.departments,
      })
    }
  }

  getValidation = () => {
    const { courseName, courseCode, departments, shortDes, courseURL } = this.state.course;
    const errors = {
      ...isRequired([
        { name: 'courseName', value: courseName },
        { name: 'courseCode', value: courseCode },
        { name: 'departments', value: departments },
        { name: 'shortDes', value: shortDes },
        { name: 'courseURL', value: courseURL },
      ])
    }
    return errors
  }

  //handle change for Select Department
  handleChangeSelect = (value) => {
    this.setState({
      course: {
        ...this.state.course,
        departments: value
      }
    })
  }

  handleSubmit = (e) => {

    e.preventDefault();
    const errors = this.getValidation();
    if (!_isEmpty(errors)) {
      this.setState({
        invalidField: Object.keys(errors),
        errMess: _isUniq(Object.values(errors)),
        isShow: true,
      }, () => {
        setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 5000)
      })
    } else {
      this.setState({
        invalidField: [],
        errMess: [],
      });
      const { course, type } = this.state;
      const formatCourse = {
        ...course,
        teachers: course.teachers.map(teacher => teacher._id)
      }
      if (type === 'add') {
        this.props.handleAddCourse(formatCourse)
      } else if (type === 'update') {
        this.props.handleUpdateCourse(formatCourse)
      }
    }
  }

  onHandleDelete = () => {
    const { course } = this.state;
    this.props.handleDeleteCourse(course._id);
  }

  handleChange = (e) => {
    this.setState({
      course: {
        ...this.state.course,
        [e.target.id]: e.target.value
      }
    })
  }

  render() {
    const { course, type, isShow, errMess, departmentOption, from } = this.state;
    const { courseName, courseCode, departments, shortDes, fullDes, courseURL } = course;
    const { isLoading, errors, isLoadingDepartment, isLoadingDelete } = this.props.addCoursePage;

    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#fff', marginRight: '10px' }} spin />;
    return (
      <Row className="addCourse">
        <Helmet>
          <title>AddCoursePage</title>
          <meta name="description" content="Description of AddCoursePage" />
        </Helmet>
        <Col span={19}>
          <Layout>
            <Header className="header">
              <Link to={from}>
                <Icon type="arrow-left" />
              </Link>
            </Header>
            <Content className="content">
              <Form>
                <input
                  className="courseName"
                  id="courseName"
                  type="text"
                  placeholder="Give your course a name"
                  value={courseName}
                  onChange={this.handleChange}
                />
                <Row className="row">
                  <Col className="courseCode " span={12}>
                    <label>
                      Course Code
                      <span>*</span>
                    </label>
                    <Input
                      className="belowLabel "
                      id="courseCode"
                      prefix={<Icon type="user" />}
                      value={courseCode}
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col span={12}>
                    <label>
                      Category
                      <span>*</span>
                    </label>
                    <Select
                      className="belowLabel"
                      mode="multiple"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      onChange={this.handleChangeSelect}
                      value={departments}
                    >
                      {
                        isLoadingDepartment ?
                          <Option key="1" value=""><Spin indicator={antIcon} /></Option> :
                          departmentOption.map(item => <Option key={item.id} value={item.description}>{item.name}</Option>)
                      }
                    </Select>
                  </Col>
                </Row>
                <Row className="row">
                  <label>
                    Short Description
                    <span>*</span>
                  </label>
                  <TextArea className="belowLabel" rows={2} id="shortDes"
                    value={shortDes}
                    onChange={this.handleChange}
                  />
                </Row>
                <Row>
                  <label>Full Description</label>
                  <TextArea className="belowLabel" rows={4} id="fullDes"
                    value={fullDes}
                    onChange={this.handleChange}
                  />
                </Row>
                <Row className="row">
                  <Col span={12}>
                    <label>Course URL<span>*</span></label>
                    <Input
                      className="belowLabel"
                      id="courseURL"
                      prefix={<Icon type="user" />}
                      value={courseURL}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
                <Row className='form-footer'>
                  {
                    type === 'update' &&
                    <Button className='deleteBtn' type="primary" onClick={this.onHandleDelete}>
                      {
                        isLoadingDelete ?
                          <Spin indicator={antIcon} /> :
                          <span>Delete Course</span>

                      }
                      <span className="icon-delete"></span>
                    </Button>
                  }
                  <Button className="addBtn" type="primary" onClick={this.handleSubmit}>
                    {
                      isLoading ?
                        <Spin indicator={antIcon} /> :
                        type === 'update' ?
                          <span style={{ marginTop: '2px' }}>Update Course</span> :
                          <span style={{ marginTop: '2px' }}>Add Course</span>
                    }
                    <Icon type="plus" />
                  </Button>
                </Row>
              </Form>
              <div className={isShow ? 'notification-show' : 'notification'}>
                {
                  errMess && errMess.length > 0 &&
                  <div className='noti-content-error'>
                    <span className='icon-noti deny-icon'></span>
                    <p>{errMess}</p>
                  </div>
                }
                {
                  errors && errors.length > 0 &&
                  <div className='noti-content-error'>
                    <span className='icon-noti deny-icon'></span>
                    <p>{errors}</p>
                  </div>
                }
              </div>
            </Content>
          </Layout>
        </Col>
        <Col className="addTeacher" span={5}>
          <SearchTeacher course={course} type={type} courseFrom={from} />
        </Col>
      </Row>
    );
  }
}

AddCoursePage.propTypes = {
  handleAddCourse: PropTypes.func.isRequired,
  handleUpdateCourse: PropTypes.func.isRequired,
  handleDeleteCourse: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addCoursePage: makeSelectAddCoursePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleAddCourse: (course) => { dispatch(addCourse(course)) },
    handleUpdateCourse: (course) => { dispatch(updateCourse(course)) },
    handleFetchDepartment: () => { dispatch(loadDepartment()) },
    handleDeleteCourse: (id) => { dispatch(deleteCourse(id)) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addCoursePage', reducer });
const withSaga = injectSaga({ key: 'addCoursePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddCoursePage);
