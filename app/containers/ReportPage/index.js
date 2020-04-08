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
import { Select, Row, Layout, Icon, Spin, Col, DatePicker, Button, Table } from 'antd';
import moment from 'moment';

import { loadTeacher, loadCourse } from './actions';
import "./index.scss";
import tableColumns from './tableCols';

/* eslint-disable react/prefer-stateless-function */
const { Content, Header } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

export class ReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {
        course: "",
        teacher: "",
        from: "",
        to: "",
      },
      isChooseDuration: false,
      isChooseDate: false,
      duration: "",
      dateRange: [],
      courses: [],
      showCourses: [],
      teachers: [],
      showTeachers: [],
      reportDatas: [],
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
        showCourses: this.props.reportPage.courses,
      })
    }
    if (prevProps.reportPage.teachers !== this.props.reportPage.teachers) {
      this.setState({
        teachers: this.props.reportPage.teachers,
        showTeachers: this.props.reportPage.teachers,
      })
    }
  }

  handleGetTeacherByCourse = (course) => {
    const { teachers } = this.state;
    let filterTeacher = [];
    if (course === "") {
      this.setState({
        showTeachers: teachers,
      })
      return
    }
    teachers.map(teacher => {
      const courseIds = teacher.courses.map(course => course._id);
      if (courseIds.includes(course)) {
        filterTeacher = [...filterTeacher, teacher];
      } else {
        filterTeacher = filterTeacher;
      }
    })
    this.setState({
      showTeachers: filterTeacher,
    })
  }

  handleGetCourseByTeacher = (teacher) => {
    const { courses } = this.state;
    let filterCourse = [];
    if (teacher === "") {
      this.setState({
        showCourses: courses,
      })
      return
    }
    courses.map(course => {
      const teacherIds = course.teachers.map(teacher => teacher._id);
      if (teacherIds.includes(teacher)) {
        filterCourse = [...filterCourse, course];
      } else {
        filterCourse = filterCourse;
      }
    })
    this.setState({
      showCourses: filterCourse,
    })
  }

  handleChoose = (value, type) => {
    this.setState({
      report: {
        ...this.state.report,
        [type]: value,
      }
    }, () => {
      switch (type) {
        case 'course':
          this.handleGetTeacherByCourse(this.state.report.course)
          break;
        case 'teacher':
          this.handleGetCourseByTeacher(this.state.report.teacher)
          break;
        default:
          break;
      }
    })
  }

  handleChooseDuration = (value) => {
    let dateTo = "";
    let dateFrom = "";
    switch (value) {
      case "week":
        dateFrom = moment().startOf('week').format('ddd MMM DD YYYY');
        dateTo = moment().endOf('week').format('ddd MMM DD YYYY');
        break;
      case "month":
        dateFrom = moment().startOf('month').format('ddd MMM DD YYYY');
        dateTo = moment().endOf('month').format('ddd MMM DD YYYY');
        break;
      case "year":
        dateFrom = moment().startOf('year').format('ddd MMM DD YYYY');
        dateTo = moment().endOf('year').format('ddd MMM DD YYYY');
        break;
      default:
        break;
    }
    this.setState({
      report: {
        ...this.state.report,
        from: dateFrom,
        to: dateTo,
      },
      isChooseDuration: true,
      duration: value,
    })
  }

  handleChooseDate = (value) => {
    if (!value || value === null || value.length === 0) {
      this.setState({
        report: {
          ...this.state.report,
          from: "",
          to: "",
        },
        isChooseDate: false,
        dateRange: [],
      })
      return
    };
    const from = moment(value[0]._d).format('ddd MMM DD YYYY');
    const to = moment(value[1]._d).format('ddd MMM DD YYYY');
    this.setState({
      report: {
        ...this.state.report,
        from,
        to,
      },
      isChooseDate: true,
      dateRange: value,
    })
  }

  handleClear = () => {
    this.setState({
      report: {
        course: "",
        teacher: "",
        from: "",
        to: "",
      },
      showCourses: this.state.courses,
      showTeachers: this.state.teachers,
      isChooseDate: false,
      isChooseDuration: false,
      duration: "",
      dateRange: [],
    })
  }

  handleSubmit = () => {
    const { report } = this.state;
    console.log(report)
  }

  // export to CSV
  handleExportCsv = () => {
    let csvRow = [];
    let A = [['TeacherName', "TeacherMail", 'CourseCode', 'NumbOfAsks', 'NumbOfOpenedAsks', 'NumbOfClosedAsks', 'Rating']];
    let re = this.state.reportDatas;
    // push to 1 row in excel file
    for (let record = 0; record < array.length; record++) {
      A.push(re[record].name, re[record].mail, re[record].courseCode, re[record].numberOfAsks, re[record].numberOfOpenedAsks, re[record].numberOfClosedAsks, re[record].rating)
    }
    // push to table in excel file
    for (let i = 0; i < A.length; i++) {
      csvRow.push(A[i].join(","))
    }
    // convert to csvString
    const csvString = csvRow.join("%OA")
  }

  render() {
    const { showCourses, showTeachers, report, isChooseDate, isChooseDuration, duration, dateRange } = this.state;
    const { isLoading } = this.props.reportPage;
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
    ]
    return (
      <div>
        <Helmet>
          <title>Report Page</title>
          <meta name="description" content="Description of ReportPage" />
        </Helmet>

        <Layout className="report-page">
          <Header className="report-page-header">
            <div className='report-page-name-wrapper'>
              <p className="report-page-name">Report</p>
            </div>
            <div className='report-page-btn'>
              <Button className='report-btn'>Export to CSV <span></span></Button>
              <Button className='report-btn' onClick={this.handleClear}>Clear filter <span className="icon ic-clear"></span></Button>
            </div>
          </Header>

          <Content>
            <Row className="row-1" gutter={25}>
              <Col span={12}>
                <Select
                  showSearch
                  className="selectTeacher"
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  placeholder="Choose teacher"
                  value={report.teacher || ""}
                  onChange={(value) => this.handleChoose(value, 'teacher')}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="" disabled><span style={{ color: "rgb(217, 217, 217)" }}>Choose teacher</span></Option>
                  {
                    showTeachers.length > 0 && showTeachers.map(item => <Option key={item._id} value={item._id}><img className="avatar" src={item.avatar} alt="avatar" /><span className="teacherName">{item.name} </span> {item.email}</Option>)
                  }
                </Select>
              </Col>
              <Col span={12}>
                <Select
                  showSearch
                  className="selectCourse"
                  style={{ width: '100%' }}
                  placeholder="Choose course"
                  optionFilterProp="children"
                  value={report.course || ""}
                  onChange={(value) => this.handleChoose(value, 'course')}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="" disabled><span style={{ color: "rgb(217, 217, 217)" }}>Choose course</span></Option>
                  {
                    showCourses.length > 0 && showCourses.map(item => <Option key={item._id} value={item._id}><span className="courseCode">{item.courseCode} </span> {item.courseName}</Option>)
                  }
                </Select>
              </Col>
            </Row>
            <Row gutter={25} style={{ marginBottom: '10px' }}>
              <Col span={12}>
                <RangePicker style={{ width: '100%' }} onChange={this.handleChooseDate} disabled={isChooseDuration} value={dateRange || []} />
              </Col>
              <Col span={6}>
                <Select
                  showSearch
                  className="selectDuration"
                  style={{ width: '100%' }}
                  placeholder="Choose duration"
                  optionFilterProp="children"
                  onChange={this.handleChooseDuration}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  disabled={isChooseDate}
                  value={duration || ''}
                >
                  <Option value="" disabled><span style={{ color: "rgb(217, 217, 217)" }}>Choose duration</span></Option>
                  {
                    time.map(item => <Option key={item.id} value={item.value}>{item.name}</Option>)
                  }
                </Select>
              </Col>
              <Col span={6}>
                <Button className='generateBtn' type="primary" onClick={this.handleSubmit}>
                  {
                    isLoading ?
                      <Spin indicator={antIcon} /> :
                      <span>Generate report</span>
                  }
                  <Icon type="project" />
                </Button>
              </Col>
            </Row>
            <Row>
              <Table
                columns={tableColumns}
              />
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
