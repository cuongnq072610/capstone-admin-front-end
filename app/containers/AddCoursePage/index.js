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
      course: {},
      courseName: '',
      courseCode: '',
      departmentsField: [],
      shortDes: '',
      fullDes: '',
      chosenTeachers: []
    };
  }

  componentDidMount() {
    const { state } = history.location;
    if (state) {
      if (history.location.state.course) {
        this.setState({
          course: history.location.state.course
        })
      } else if (history.location.state.chosenTeachers) {
        this.setState({
          chosenTeachers: history.location.state.chosenTeachers
        })
      }
    }
  };

  onChangeValue = e => {
    this.setState({
      skill: e.target.value,
    });
  };

  //handle change for Select Department
  handleChangeSelect = (value) => {
    // console.log(value);
    this.setState({
      departmentsField: value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    const { courseName, courseCode, departmentsField, shortDes, fullDes, chosenTeachers, course } = this.state;
    const { Option } = Select;
    const departments = [{
      name: 'computer',
      displayName: 'Computer Science'
    },
    {
      name: 'business',
      displayName: 'Business'
    },
    {
      name: 'finance',
      displayName: 'Finance'
    },
    {
      name: 'design',
      displayName: 'Graphic Design'
    }]

    const children = [];
    //pushing Option component into children
    departments.map(department => {
      children.push(<Option key={departments.indexOf(department)}
        value={department.name}>{department.displayName}</Option>)
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
                  value={course.courseName ? course.courseName : courseName}
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
                      value={course.courseCode ? course.courseCode : courseCode}
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
                      value={course.departments ? course.departments : departmentsField}
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
                    value={course.shortDes ? course.shortDes : shortDes}
                    onChange={this.handleChange}
                  />
                </Row>
                <Row>
                  <label>Full Description</label>
                  <TextArea className="belowLabel" rows={4} id="fullDes"
                    value={course.fullDes ? course.fullDes : fullDes}
                    onChange={this.handleChange}
                  />
                </Row>
                <Row className="row">
                  <Col span={12}>
                    <label>Course URL<span>*</span></label>
                    <Input
                      className="belowLabel"
                      prefix={<Icon type="user" />}
                      value={course.courseURL ? course.courseURL : ""} />
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
          <SearchTeacher chosenTeachers={course.teachers ? course.teachers : chosenTeachers}/>
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
