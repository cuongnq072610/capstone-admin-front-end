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
import { Row, Layout, Col, Table, Icon } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import WrappedSearchBar from '../../components/SearchBar';
import Filter from '../../components/Filter';
import './index.scss';
import columns from './tableCol';

const { Content, Header } = Layout;
const mockData = [
  {
    courseId: 'ASD203',
    courseName: 'Algorithms and Data Theories',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Computer Science',
    numberOfTeacher: 12,
  },
  {
    courseId: 'ANM101',
    courseName: 'Animation Designing',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Graphic Design',
    numberOfTeacher: 12,
  },
  {
    courseId: 'EVP501',
    courseName: 'Building Event Plans',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Communication',
    numberOfTeacher: 12,
  },
  {
    courseId: 'COM101',
    courseName: 'Communication Principles',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Communication Business',
    numberOfTeacher: 12,
  },
  {
    courseId: 'ASD203',
    courseName: 'Algorithms and Data Theories',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Computer Science',
    numberOfTeacher: 12,
  },
  {
    courseId: 'ANM101',
    courseName: 'Animation Designing',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Graphic Design',
    numberOfTeacher: 12,
  },
  {
    courseId: 'EVP501',
    courseName: 'Building Event Plans',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Communication',
    numberOfTeacher: 12,
  },
  {
    courseId: 'COM101',
    courseName: 'Communication Principles',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Communication Business',
    numberOfTeacher: 12,
  },
  {
    courseId: 'ASD203',
    courseName: 'Algorithms and Data Theories',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Computer Science',
    numberOfTeacher: 12,
  },
  {
    courseId: 'ANM101',
    courseName: 'Animation Designing',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Graphic Design',
    numberOfTeacher: 12,
  },
  {
    courseId: 'EVP501',
    courseName: 'Building Event Plans',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Communication',
    numberOfTeacher: 12,
  },
  {
    courseId: 'COM101',
    courseName: 'Communication Principles',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    category: 'Communication Business',
    numberOfTeacher: 12,
  },
];


const mockData2 = [
  "Business", "Business Communication", "Communication", "Finance", "Graphic Design"
];


/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      courses: [],
      categories: [],
    }
  }

  componentDidMount() {
    const newCourses = mockData.map((course, index) => {
      return { ...course, key: `${index}` }
    })
    this.setState({
      courses: newCourses,
      categories: mockData2,
    })
  }

  onFilter = () => {
    let newArr = this.state.courses.sort((a, b) => {
      if (a.courseName < b.courseName) return -1;
      if (a.courseName > b.courseName) return 1;
      return 0;
    });
    this.setState({
      courses: newArr,
    })
  }

  render() {
    const { courses, categories } = this.state;
    // console.log(this.props.homePage)
    return (
      <Row>
        <Helmet>
          <title>HomePage</title>
          <meta name="description" content="Description of HomePage" />
        </Helmet>
        <Col span={20}>
          <Layout>
            <Header
              style={{
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                height: '100px',
              }}
            >
              <WrappedSearchBar
                message="Please enter your course name"
                placeholder="I want to find my course"
              />
            </Header>
            <Content>
              <Row type="flex" justify="center">
                <Table
                  columns={columns}
                  dataSource={courses}
                  className="courseTable"
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: e => this.props.history.push({
                        pathname: './addcourse',
                        state: {course: record}
                      })
                    }
                  }}
                />
              </Row>
              <div className="float" onClick={() => this.props.history.push("/addcourse")}>
                <Icon type="plus" className="my-float" />
              </div>
            </Content>
          </Layout>
        </Col>
        <Col span={4}>
          <Filter onFilter={this.onFilter} categories={categories} />
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
