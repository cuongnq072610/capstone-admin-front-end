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
import { addCourse, updateCourse } from './actions';
import { isRequired } from '../../utils/validation';

/* eslint-disable react/prefer-stateless-function */

const { TextArea } = Input;

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
    };
  }

  componentDidMount() {
    const { state } = history.location;
    if (state) {
      if (state.course) {
        this.setState({
          course: state.course,
          type: state.type
        })
      } else {
        this.setState({
          type: state.type
        })
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.addCoursePage !== this.props.addCoursePage
      && this.props.addCoursePage.isDone
      && this.props.addCoursePage.isLoading === false
      || prevState.errMess !== this.state.errMess && this.state.errMess.length !== 0
    ) {
      this.setState({
        isShow: true
      }, () => {
        setTimeout(() => {
          this.setState({
            isShow: false
          })
        }, 3000)
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
      console.log(errors)
      this.setState({
        invalidField: Object.keys(errors),
        errMess: _isUniq(Object.values(errors)),
      })
    } else {
      this.setState({
        invalidField: [],
        errMess: [],
      })
      const { course, type } = this.state;
      if (type === 'add') {
        this.props.handleAddCourse(course)
      } else if (type === 'update') {
        this.props.handleUpdateCourse(course)
      }
    }
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
    const { course, type, isShow, errMess } = this.state;
    const { courseName, courseCode, departments, shortDes, fullDes, courseURL } = course;
    const { isLoading, isDone } = this.props.addCoursePage;
    const { Option } = Select;
    const departmentOption = [{
      id: 1,
      value: 'computer',
      name: 'Computer Science'
    },
    {
      id: 2,
      value: 'business',
      name: 'Business'
    },
    {
      id: 3,
      value: 'finance',
      name: 'Finance'
    },
    {
      id: 4,
      value: 'design',
      name: 'Graphic Design'
    }]

    const children = [];
    //pushing Option component into children
    departmentOption.map(item => {
      children.push(<Option key={item.id} value={item.value}>{item.name}</Option>)
    })
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
              <Link to="/course">
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
                      {children}
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
              </Form>
              <div className={isShow ? 'notification-show' : 'notification'}>
                {
                  errMess && errMess.length > 0 ?
                    <div className='noti-content-error'>
                      <span className='icon-noti deny-icon'></span>
                      <p>{errMess}</p>
                    </div>
                    :
                    <div className='noti-content-success'>
                      <span className="icon-noti accept-icon"></span>
                      <p>Done</p>
                    </div>
                }
              </div>
            </Content>
          </Layout>
        </Col>
        <Col className="addTeacher" span={5}>
          <SearchTeacher course={course} type={type} />
        </Col>
      </Row>
    );
  }
}

AddCoursePage.propTypes = {
  handleAddCourse: PropTypes.func.isRequired,
  handleUpdateCourse: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addCoursePage: makeSelectAddCoursePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleAddCourse: (course) => { dispatch(addCourse(course)) },
    handleUpdateCourse: (course) => { dispatch(updateCourse(course)) },
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
