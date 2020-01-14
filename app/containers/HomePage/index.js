/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Layout, Col } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Box from './box';
import WrappedSearchBar from '../../components/SearchBar';

const { Sider, Content, Header } = Layout;
const mockData = [
  {
    courseId: "ASD203",
    courseName: "Algorithms and Data Theories",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Computer Science",
    numberOfTeacher: 12
  },
  {
    courseId: "ANM101",
    courseName: "Animation Designing",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Graphic Design",
    numberOfTeacher: 12
  },
  {
    courseId: "EVP501",
    courseName: "Building Event Plans",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Communication",
    numberOfTeacher: 12
  },
  {
    courseId: "COM101",
    courseName: "Communication Principles",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Communication Business",
    numberOfTeacher: 12
  },
  {
    courseId: "ASD203",
    courseName: "Algorithms and Data Theories",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Computer Science",
    numberOfTeacher: 12
  },
  {
    courseId: "ANM101",
    courseName: "Animation Designing",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Graphic Design",
    numberOfTeacher: 12
  },
  {
    courseId: "EVP501",
    courseName: "Building Event Plans",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Communication",
    numberOfTeacher: 12
  },
  {
    courseId: "COM101",
    courseName: "Communication Principles",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Communication Business",
    numberOfTeacher: 12
  },
  {
    courseId: "ASD203",
    courseName: "Algorithms and Data Theories",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Computer Science",
    numberOfTeacher: 12
  },
  {
    courseId: "ANM101",
    courseName: "Animation Designing",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Graphic Design",
    numberOfTeacher: 12
  },
  {
    courseId: "EVP501",
    courseName: "Building Event Plans",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Communication",
    numberOfTeacher: 12
  },
  {
    courseId: "COM101",
    courseName: "Communication Principles",
    description: "The course goes through simple algorithms and thier applications in data manipulation",
    category: "Communication Business",
    numberOfTeacher: 12
  },
]
/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  render() {
    return (
      <Row>
        <Helmet>
          <title>HomePage</title>
          <meta name="description" content="Description of HomePage" />
        </Helmet>
        <Col span={20}>
          <Layout style={{ backgroundColor: '#fff' }}>
            <Header style={{ backgroundColor: '#fff', display: "flex", justifyContent: 'center', height: '100px' }}>
              <WrappedSearchBar
                message="Please enter your course name"
                placeholder="I want to find my course"
              />
            </Header>
            <Content>
              <Row type="flex" justify="space-around">
                {
                  mockData.map((course, index) => {
                    return (
                      <Box course={course} key={index} />
                    )
                  })
                }
              </Row>
            </Content>
          </Layout>
        </Col>
        <Col span={4}>
          <Sider>
          </Sider>
        </Col>
      </Row>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
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

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
