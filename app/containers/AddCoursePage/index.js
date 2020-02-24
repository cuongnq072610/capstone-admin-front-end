/**
 *
 * AddCoursePage
 *
 */
import { Link } from 'react-router-dom';
import './addCourse.scss';
import { Select, Layout, Row, Col, Input, Icon, Form, Button } from 'antd';
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
    };
  }

  componentDidMount() {
    const { state } = history.location;
    if (state) {
      if (history.location.state.course) {
        this.setState({
          course: history.location.state.course
        })
      }
    }
  };

  //handle change for Select Department
  handleChangeSelect = (value) => {
    // var newDepartments = this.state.departments;
    // console.log(newDepartments)
    // value.forEach(item => {
    //   newDepartments.push(item)
    // });
    // console.log(newDepartments)
    this.setState({
      course: {
        ...this.state.course,
        departments: value
        // departments: newDepartments,
      }
    })
    console.log(value)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
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
    const { course } = this.state;
    const { courseName, courseCode, departments, shortDes, fullDes, courseURL } = course;
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
                  Add course
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addCoursePage: makeSelectAddCoursePage(),
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

const withReducer = injectReducer({ key: 'addCoursePage', reducer });
const withSaga = injectSaga({ key: 'addCoursePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddCoursePage);
