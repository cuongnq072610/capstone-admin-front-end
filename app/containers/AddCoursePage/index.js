/**
 *
 * AddCoursePage
 *
 */
import { Link } from 'react-router-dom';
import "./index.css";
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
/* eslint-disable react/prefer-stateless-function */

const { Search } = Input;

const { Header, Content, Sider } = Layout;
function handleChange(value) {
}
export class AddCoursePage extends React.PureComponent {

  constructor(props) {
    super(props); 
    this.state = {
      skill: '',
      skills: [],
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log(this.state.skill)
  }

  onChangeValue = (e) => {
    this.setState({
      skill: e.target.value,
    })
  }

  btnAddSkill = () => {
    return (
      <Button style={{ border: 'none', height: '30px', paddingBottom: '10px' }} htmlType="submit">
        < Icon type="plus" style={{ color: 'rgba(0,0,0,.25)' }} />
      </Button>
    )
  }

  render() {
    return (
      <Row>
        <Helmet>
          <title>AddCoursePage</title>
          <meta name="description" content="Description of AddCoursePage" />
        </Helmet>
        <Col span={20}>
          <Layout>
            <Header style={{ backgroundColor: "white" }}>
              <Row>
                <Col span={12}>
                  <Link to="/">
                    <Icon type="arrow-left" style={{ color: "#9C4AEE", fontSize: "20px" }} />
                  </Link>
                </Col>
                <Col span={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Link to="/" style={{
                    color: "#9C4AEE", textAlign: "center", display: "flex", alignItems: "center"
                  }}><span style={{ fontSize: "15px" }}>Add course</span>
                    <Icon style={{ color: "#9C4AEE", marginLeft: "10px", fontSize: "20px" }} type="plus" />
                  </Link>
                </Col>
              </Row>
            </Header>
            <Content style={{ paddingLeft: "50px" }}>
              <Form>
                <Row style={{ margin: "10px 0px" }}>
                  <input type="text" placeholder="Give your course a name*"
                    style={{ backgroundColor: "white", width: "364px", height: "43px" }}></input>
                </Row>
                <Row >
                  <Col span={12}>
                    <p>Course Code*</p>
                    <Input
                      style={{ width: "442px", height: "30px" }}
                      prefix={<Icon type="user" />}
                    />
                  </Col>
                  <Col span={12}>
                    <p>Category*</p>
                    <Select
                      style={{ width: "442px", height: "35px" }}
                      prefix={<Icon type="user" />}
                    />
                  </Col>
                </Row>
                <Row>
                  <p>Short Description</p>
                  <textarea style={{ width: "952px", height: "90px", border: "1px solid #C6C6C6" }}></textarea>
                </Row>
                <Row>
                  <p>Full Description</p>
                  <textarea style={{ width: "952px", height: "90px", border: "1px solid #C6C6C6" }}></textarea>
                </Row>
                <Row>
                  <p>Skills learnt in this course</p>
                  <Form onSubmit={this.handleClick}>
                    <Input
                      style={{ width: "442px", height: "35px", border: "1px solid #C6C6C6", alignItems: 'center' }}
                      suffix={this.btnAddSkill(this.handleClick)}
                      prefix={<Icon type="tool" />}
                      onChange={this.onChangeValue}
                    ></Input>
                  </Form>
                </Row>
              </Form>
            </Content>
          </Layout>
        </Col>
        <Col span={4}>
          <Search
            placeholder="Search for or add teachers"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </Col>
        {/* <FormattedMessage {...messages.header} /> */}
      </Row>
    );
  }
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
function onSelect(value) {
  console.log("onSelect", value);
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
