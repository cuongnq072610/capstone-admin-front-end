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
    const { course, type } = this.state;
    console.log(course)
    if(type === 'add') {
      this.props.handleAddCourse(course)
    } else if(type === 'update') {
      this.props.handleUpdateCourse(course)
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
    const { course, type } = this.state;
    const { courseName, courseCode, departments, shortDes, fullDes, courseURL } = course;
    const { isLoading } = this.props.addCoursePage;
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
                        <span style={{ marginTop: ' 2px' }}>Add Course</span>
                  }
                  <Icon type="plus" />
                </Button>
              </Form>
            </Content>
          </Layout>
        </Col>
        <Col className="addTeacher" span={5}>
          <SearchTeacher course={course} />
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
    handleUpdateCourse: (course) => {dispatch(updateCourse(course))},
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
