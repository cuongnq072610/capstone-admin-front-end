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
    departments: ['Communication Business', 'New Category', 'Communication'],
    numberOfTeacher: 12,
  },
  {
    courseId: 'ANM101',
    courseName: 'Animation Designing',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    departments: ['Communication Business', 'New Category', 'Category New', "New new new new", 'Communication Business', 'New Category', 'Category New'],
    numberOfTeacher: 12,
  },
  {
    courseId: 'EVP501',
    courseName: 'Building Event Plans',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    departments: ['Communication'],
    numberOfTeacher: 12,
  },
  {
    courseId: 'COM101',
    courseName: 'Communication Principles',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    departments: ['Communication Business'],
    numberOfTeacher: 12,
  },
  {
    courseId: 'ASD203',
    courseName: 'Algorithms and Data Theories',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    departments: ['Computer Science'],
    numberOfTeacher: 12,
  },
  {
    courseId: 'ANM101',
    courseName: 'Animation Designing',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    departments: ['Graphic Design'],
    numberOfTeacher: 12,
  },
  {
    courseId: 'EVP501',
    courseName: 'Building Event Plans',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    departments: ['Communication'],
    numberOfTeacher: 12,
  },
  {
    courseId: 'COM101',
    courseName: 'Communication Principles',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    departments: ['Communication Business'],
    numberOfTeacher: 12,
  },
  {
    courseId: 'ASD203',
    courseName: 'Algorithms and Data Theories',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    departments: ['Computer Science'],
    numberOfTeacher: 12,
  },
  {
    courseId: 'ANM101',
    courseName: 'Animation Designing',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    departments: ['Graphic Design'],
    numberOfTeacher: 12,
  },
  {
    courseId: 'EVP501',
    courseName: 'Building Event Plans',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    departments: ['Communication'],
    numberOfTeacher: 12,
  },
  {
    courseId: 'COM101',
    courseName: 'Communication Principles',
    description:
      'The course goes through simple algorithms and thier applications in data manipulation',
    departments: ['Graphic Design'],
    numberOfTeacher: 12,
  },
];


const mockData2 = [
  "Business", "Communication Business", "Communication", "Finance", "Graphic Design"
];


/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      courses: [],
      departments: [],
      baseCourses: []
    }
  }

  componentDidMount() {
    const newCourses = mockData.map((course, index) => {
      return { ...course, key: `${index}` }
    })
    this.setState({
      courses: newCourses,
      departments: mockData2,
      baseCourses: newCourses,
    })
  }

  onResetFilter = () => {
    const { baseCourses } = this.state;
    this.setState({
      courses: baseCourses,
    })
  }

  checkDepartment = (departments, checkDepartments) => {
    return checkDepartments.some(department => departments.indexOf(department) >= 0);
  }

  filterByDepartment = (departments) => {
    const { baseCourses } = this.state;
    if (!departments || departments.length === 0) {
      this.onResetFilter();
    } else {
      const filterCourses = baseCourses.filter((course, index) => {
        return this.checkDepartment(course.departments, departments) === true;
      })
      this.setState({
        courses: filterCourses
      })
    }
  }

  render() {
    const { courses, departments } = this.state;
    return (
      <Row className="homepage">
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
                type="home"
              />
            </Header>
            <Content>
              <Row>
                <Table
                  columns={columns}
                  dataSource={courses}
                  className="courseTable"
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: e => this.props.history.push({
                        pathname: './addcourse',
                        state: { course: record }
                      })
                    }
                  }}
                  // loading={true}
                />
              </Row>
              <div className="float" onClick={() => this.props.history.push("/addcourse")}>
                <Icon type="plus" className="my-float" />
              </div>
            </Content>
          </Layout>
        </Col>
        <Col span={4}>
          <Filter
            departments={departments}
            onFilter={this.filterByDepartment}
            onReset={this.onResetFilter}
            type={'home'}
          />
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
