/**
 *
 * ReportPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectReportPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Select, Row, Layout, Icon, Input, Spin, Col, DatePicker, Button} from 'antd';

import { loadTeacher, loadCourse } from './actions';
import "./index.scss";

/* eslint-disable react/prefer-stateless-function */
const { Content, Header } = Layout;
const {RangePicker} = DatePicker;

export class ReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report : {
        course: "",
        teacher: ""
      },
      isShow: false,
      isLoading : false,
      courses: [],
      teachers: [],
      showTeachers: [],
    }
  }

  componentDidMount() {
    this.props.fetchCourse();
    this.props.fetchTeacher();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reportPage.courses !== this.props.reportPage.courses) {
      this.setState({
        courses: this.props.reportPage.courses,
      })
    }
    if (prevProps.reportPage.teachers !== this.props.reportPage.teachers) {
      this.setState({
        teachers: this.props.reportPage.teachers,
      })
    }

    console.log(this.props.reportPage.teachers)
  }

  handleChooseCourse = (value) => {
    this.setState({
      report: {
        ...this.state.report,
        course: value
      }
    }, () => {
      this.getTeachersByCourse(this.state.question.course)
    })
  }

  handleChooseTeacher = (value) => {
    this.setState({
      report: {
        ...this.state.report,
        teacher: value
      }
    })
  }

  render() {
    const {teachers, courses, isLoading} = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#fff', marginRight: '10px' }} spin />;
    const time = [
      {
        id: 1,
        value: 'week',
        name: 'This week'
      },
      {
        id: 2,
        value: 'month',
        name: 'This month'
      },
      {
        id: 3,
        value: 'year',
        name: 'This year'
      },
      {
        id: 4,
        value: 'all',
        name: 'All time'
      }
    ]
    return (
      <div>
        <Helmet>
          <title>StudentAskPage</title>
          <meta name="description" content="Description of StudentAskPage" />
        </Helmet>

        <Layout className="report-page">
          <Header className="report-page-header">
            <div className='report-page-name-wrapper'>
              <p className="report-page-name">Report</p>
            </div>
          </Header>

          <Content>
            <Row className="row-1" gutter={25}>
                <Col span={12}>
                  <Select
                    showSearch
                    className = "selectTeacher"
                    style={{ width: '100%' }}
                    optionFilterProp="children"
                    placeholder="Choose teacher"
                    onChange={this.handleChooseTeacher}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      teachers.length > 0 && teachers.map(item => <Option key={item._id} value={item._id}><img className="avatar" src={item.avatar} alt="avatar" /><span className="teacherName">{item.name}</span> {item.email}</Option>)
                    }
                  </Select>
                </Col>
                <Col span={12}>
                  <Select
                    showSearch
                    className = "selectCourse"
                    style={{ width: '100%' }}
                    placeholder="Choose course"
                    optionFilterProp="children"
                    onChange={this.handleChooseCourse}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      courses.length > 0 && courses.map(item => <Option key={item._id} value={item._id}><span className="courseCode">{item.courseCode} </span> {item.courseName}</Option>)
                    }
                  </Select>
                </Col>
              </Row>
              <Row gutter={25}>
                <Col span={12}>
                  <RangePicker style={{ width: '100%' }} />
                </Col>
                <Col span={6}>
                  <Select
                  showSearch
                  className = "selectCourse"
                  style={{ width: '100%' }}
                  placeholder="Choose course"
                  defaultValue = "all"
                  optionFilterProp="children"
                  onChange={this.handleChooseCourse}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  >
                    {
                      time.map(item => <Option key={item.id} value={item.value}>{item.name}</Option>)
                    }
                  </Select>
                </Col>
                <Col span={6}>
                  <Button className='generateBtn' type="primary" onClick={this.onHandleDelete}>
                    {
                      isLoading ?
                        <Spin indicator={antIcon} /> :
                        <span>Generate report</span>
                    }
                    <Icon type="project" />
                  </Button>
                </Col>
              </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

ReportPage.propTypes = {
  fetchCourse: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  reportPage: makeSelectReportPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCourse: () => { dispatch(loadCourse()) },
    fetchTeacher: () => { dispatch(loadTeacher()) }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'reportPage', reducer });
const withSaga = injectSaga({ key: 'reportPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReportPage);
