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
import history from '../../utils/history';
import WrappedSearchBar from '../../components/SearchBar';
import Filter from '../../components/Filter';
import './index.scss';
import columns from './tableCol';
import { loadCourse, searchCourse } from './actions';

const { Content, Header } = Layout;

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
      baseCourses: [],
      isShow: false
    }
  }

  componentDidMount() {
    this.props.fetchCourse();
    const { history } = this.props;
    if (history.location.state && history.location.state.isDone) {
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

  componentDidUpdate(prevProps) {
    if (prevProps.homePage !== this.props.homePage) {
      const { courses } = this.props.homePage;
      const newCourses = courses.map((course, index) => {
        return {
          ...course,
          key: `${index}`,
          numberOfTeacher: course.teachers.length,
        }
      })
      this.setState({
        courses: newCourses,
        departments: mockData2,
        baseCourses: newCourses,
      })
    }
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

  handleSearch = (key) => {
    this.props.fetchSearchCourse(key)
  }

  handleClear = () => {
    this.props.fetchCourse();
  }

  render() {
    const { courses, departments, isShow } = this.state;
    const { isLoading } = this.props.homePage;
    return (
      <Row className="homepage">
        <Helmet>
          <title>HomePage</title>
          <meta name="description" content="Description of HomePage" />
        </Helmet>
        <Col span={19}>
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
                handleSearch={this.handleSearch}
                handleClear={this.handleClear}
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
                      onClick: e => history.push({
                        pathname: './addcourse',
                        state: { course: record, type: 'update' }
                      })
                    }
                  }}
                  loading={isLoading}
                  // for pagination
                  pagination={{
                    onChange: (page) => { console.log(page) }
                  }}
                />
              </Row>
              <div className="float" onClick={() => history.push({
                pathname: "/addcourse",
                state: {
                  type: 'add'
                }
              })}>
                <Icon type="plus" className="my-float" />
              </div>
            </Content>
          </Layout>
        </Col>
        <Col span={5}>
          <Filter
            departments={departments}
            onFilter={this.filterByDepartment}
            onReset={this.onResetFilter}
            type={'home'}
          />

        </Col>
        <div className={isShow ? 'notification-home-show' : 'notification-home'}>
          {
            <div className='noti-content-success'>
              <span className='icon-noti accept-icon'></span>
              <p>DONE</p>
            </div>
          }
        </div>
      </Row>
    );
  }
}

HomePage.propTypes = {
  fetchCourse: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCourse: () => { dispatch(loadCourse()) },
    fetchSearchCourse: (key) => { dispatch(searchCourse(key)) }
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
