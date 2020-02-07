/**
 *
 * AddCoursePage
 *
 */
import { Link } from 'react-router-dom';
import './addCourse.scss';
import { Select, Layout, Row, Col, Input, Icon, Form, Button, Tag } from 'antd';
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
import AddTeacher from '../../components/AddTeacher';
/* eslint-disable react/prefer-stateless-function */

const { Search, TextArea, Option } = Input;

const { Header, Content } = Layout;

const mockData = {
  courseCode: 'ASD203',
  category: 'Computer Science',
  description:
    'The course goes through simple algorithms and thier applications in data manipulation',
};
// const mockData = []

export class AddCoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: '',
      skills: [],
      course: {},
    };
  }

  handleClick = e => {
    e.preventDefault();
    let newArr = [];
    newArr = [...this.state.skills, this.state.skill];
    this.setState({
      skill: '',
      skills: newArr,
    });
  };

  componentDidMount() {
    if (mockData) {
      console.log(mockData)
      this.setState({
        course: mockData
      })
    }
    console.log(this.props.history)
  };

  onChangeValue = e => {
    this.setState({
      skill: e.target.value,
    });
  };

  btnAddSkill = () => (
    <Button
      style={{ border: 'none', height: '30px', paddingBottom: '10px' }}
      htmlType="submit"
    >
      <Icon type="plus" style={{ color: 'rgba(0,0,0,.25)' }} />
    </Button>
  );

  handleClose = removedSkill => {
    const newArr = this.state.skills.filter(item => item !== removedSkill);
    console.log(newArr);
    this.setState({ skills: newArr });
  };

  render() {
    const { onFilter, categories } = this.props;
    const { skill, skills } = this.state;
    const { Option } = Select;
    const { courses, category } = this.state;
    const departments = [{
      value: 'computer',
      name: 'Computer Science'
    },
    {
      value: 'business',
      name: 'Business'
    },
    {
      value: 'finance',
      name: 'Finance'
    },
    {
      value: 'design',
      name: 'Graphic Design'
    }]

    const children = [];

    //pushing Option component into children
    departments.map(department => {
      children.push(<Option key={departments.indexOf(department)}
        value={department.value}>{department.name}</Option>)
    })

    //handle change for Select Department
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    return (
      <Row className="addCourse">
        <Helmet>
          <title>AddCoursePage</title>
          <meta name="description" content="Description of AddCoursePage" />
        </Helmet>
        <Col span={19}>
          <Layout>
            <Header className="header">
              <Link to="/">
                <Icon type="arrow-left" />
              </Link>
            </Header>
            <Content className="content">
              <Form>
                <input
                  className="courseName"
                  type="text"
                  placeholder="Give your course a name"
                />
                <Row className="row">
                  <Col className="courseCode " span={12}>
                    <label>
                      Course Code
                      <span>*</span>
                    </label>
                    <Input
                      className="belowLabel "
                      prefix={<Icon type="user" />}
                      value={this.state.course.courseCode ? this.state.course.courseCode : ""}
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
                      onChange={handleChange}
                      value={this.state.course.category ? this.state.course.category : ""}
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
                  <TextArea className="belowLabel" rows={2}
                    value={this.state.course.description ? this.state.course.description : ""}
                  />
                </Row>
                <Row>
                  <label>Full Description</label>
                  <TextArea className="belowLabel" rows={4}

                  />
                </Row>
                <Row className="row">
                  <Col span={12}>
                    <label>Course URL<span>*</span></label>
                    <Input
                      className="belowLabel"
                      prefix={<Icon type="user" />}
                    />
                    <div className="tag">
                      {skills.map((item, index) => (
                        <Tag
                          color="purple"
                          key={index}
                          closable
                          onClose={e => {
                            e.preventDefault();
                            this.handleClose(item);
                          }}
                        >
                          {item}
                        </Tag>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Form>
              <Button className="addBtn" type="primary">
                Add course
                <Icon type="plus" />
              </Button>
            </Content>
          </Layout>
        </Col>
        <Col className="addTeacher" span={5}>
          <AddTeacher />
        </Col>
        {/* <FormattedMessage {...messages.header} /> */}
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
