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
/* eslint-disable react/prefer-stateless-function */

const { Search, TextArea,Option } = Input;

const { Header, Content } = Layout;

export class AddCoursePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skill: '',
      skills: [],
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
    const { skill, skills } = this.state;
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
                    />
                  </Col>
                  <Col span={12}>
                    <label>
                      Category
                      <span>*</span>
                    </label>
                    <Select
                      className="belowLabel"
                      defaultValue="computer"
                      prefix={<Icon type="unordered-list" />}
                    >
                      <Option value="computer">Computer Science</Option>
                      <Option value="business">Business</Option>
                      <Option value="finance">Finance</Option>
                      <Option value="graphic">Graphic Design</Option>
                    </Select>
                  </Col>
                </Row>
                <Row className="row">
                  <label>
                    Short Description
                    <span>*</span>
                  </label>
                  <TextArea className="belowLabel" rows={2} />
                </Row>
                <Row>
                  <label>Full Description</label>
                  <TextArea className="belowLabel" rows={4} />
                </Row>
                <Row className="row">
                  <Col span={12}>
                    <label>Skills learnt in this course</label>
                    <Form className="belowLabel" onSubmit={this.handleClick}>
                      <Input
                        suffix={this.btnAddSkill(this.handleClick)}
                        prefix={<Icon type="tool" />}
                        onChange={this.onChangeValue}
                      />
                    </Form>
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
                      )}
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
          <h1>Teachers</h1>
          <Search
            placeholder="Search for or add teachers"
            onSearch={value => console.log(value)}
          />
          <p>0 teacher</p>
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
