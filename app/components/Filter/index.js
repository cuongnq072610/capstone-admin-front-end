/**
 *
 * Filter
 *
 */

import React from 'react';
import { Layout, Button, Popover, Select } from 'antd';
import "./index.scss";
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const { Option } = Select;
/* eslint-disable react/prefer-stateless-function */
class Filter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chosenDepartments: [],
      activeType: "",
      course: "",
      status: "",
      faqDisplay: "",
    }
  }

  handleFilterDepartment = (department) => {
    const { onFilter } = this.props;
    const { chosenDepartments } = this.state;
    let newChosenDepartments = [];
    if (chosenDepartments.includes(department)) {
      newChosenDepartments = chosenDepartments.filter(item => item !== department)
    } else {
      newChosenDepartments = [...chosenDepartments, department]
    }
    this.setState({
      chosenDepartments: newChosenDepartments
    }, () => {
      onFilter(this.state.chosenDepartments)
    })
  }

  isCheckDepartment = (department) => {
    return this.state.chosenDepartments.includes(department);
  }

  renderDepartments = (department, index) => {
    return (
      <Button className={`category categoryHomeTheme `} key={index} onClick={() => this.handleFilterDepartment(department)}>
        <span className={`icon ${this.isCheckDepartment(department) ? "check-icon" : "category-icon"}`}></span>
        <span className="name">{department.description}</span>
      </Button>
    )
  }

  handleReset = () => {
    this.props.onReset();
    this.setState({
      chosenDepartments: [],
      activeType: "",
      course: "",
      status: "",
      faqDisplay: "",
    })
  }

  handleChooseActiveType = (type) => {
    const { onFilter } = this.props;
    this.setState({
      activeType: type,
      course: "",
    }, () => {
      onFilter(this.state.activeType)
    })
  }

  handleChooseCourse = (value) => {
    const { onFilterCourse } = this.props;
    this.setState({
      activeType: "",
      course: value,
    }, () => {
      onFilterCourse(this.state.course)
    })
  }

  handleChooseStatus = (value) => {
    const { onFilter } = this.props;
    this.setState({
      status: value,
    }, () => {
      onFilter(this.state.status)
    })
  }

  handleChooseFaq = (value) => {
    const { onFilter } = this.props;
    this.setState({
      faqDisplay: value,
    }, () => {
      onFilter(this.state.faqDisplay)
    })
  }

  render() {
    const { activeType, course, status, faqDisplay } = this.state;
    const { departments, type, courses } = this.props;
    const content = <Layout className="wrap">
      {
        type === "home" &&
        <div>
          <span>Department:</span>
          {
            departments.map((department, index) => {
              return this.renderDepartments(department, index)
            })
          }
        </div>
      }
      {
        type === 'teacher' &&
        <div>
          <div className="filter-active">
            <span className="icon-filter-active"></span>
            <p>Display:</p>
            <Button onClick={() => this.handleChooseActiveType("active")} className={`filter-active-btn filter-active-btn-${activeType === 'active' && 'chosen'}`}>active</Button>
            <Button onClick={() => this.handleChooseActiveType("inactive")} className={`filter-active-btn filter-active-btn-${activeType === 'inactive' && 'chosen'}`}>inactive</Button>
          </div>
          <div className='filter-course'>
            <div className='filter-course-name'>
              <span className="icon-filter-course"></span>
              <p>Course:</p>
            </div>
            <Select
              style={{ width: '100%' }}
              placeholder="Please select"
              onChange={this.handleChooseCourse}
              value={course}
            >
              {
                courses.map((item, index) => <Option key={index} value={item}>{item}</Option>)
              }
            </Select>
          </div>
        </div>
      }
      {
        type === 'ask' &&
        <div className="filter-status">
          <span className="icon-filter-active"></span>
          <p>Status:</p>
          <Button onClick={() => this.handleChooseStatus("seen")} className={`filter-status-btn filter-status-btn-${status === 'seen' && 'chosen'}`}>Seen</Button>
          <Button onClick={() => this.handleChooseStatus("unseen")} className={`filter-status-btn filter-status-btn-${status === 'unseen' && 'chosen'}`}>Unseen</Button>
          <Button onClick={() => this.handleChooseStatus("opened")} className={`filter-status-btn filter-status-btn-${status === 'opened' && 'chosen'}`}>Opened</Button>
          <Button onClick={() => this.handleChooseStatus("closed")} className={`filter-status-btn filter-status-btn-${status === 'closed' && 'chosen'}`}>Closed</Button>
        </div>
      }
      {
        type === 'faq' &&
        <div className="filter-status" id='faq'>
          <div className='faq-tag'>
            <span className="icon-filter-active"></span>
            <p>Display:</p>
          </div>
          <Button onClick={() => this.handleChooseFaq("yours")} className={`filter-status-btn filter-status-btn-${faqDisplay === 'yours' && 'chosen'}`}>Yours</Button>
          <Button onClick={() => this.handleChooseFaq("all")} className={`filter-status-btn filter-status-btn-${faqDisplay === 'all' && 'chosen'}`}>All</Button>
        </div>
      }
      <Button className={`clearBtn ${type === "home" ? "clearBtnHomeTheme" : type === 'teacher' ? "clearBtnTeacherTheme" : "clearBtnAskTheme"}`} onClick={this.handleReset}>
        <span>Clear filter</span>
      </Button>
    </Layout>;
    return <Popover
      placement="bottomRight"
      title="Filter"
      trigger="click"
      content={content}
    >
      <Button className={`filter-wrap-btn ${type === "home" ? "filter-home-btn" : type === 'teacher' ? "filter-teacher-btn" : "filter-ask-btn"}`}>
        <span className={`filter-wrap-btn-icon ${type === "home" ? "filter-wrap-btn-icon-course" : type === 'teacher' ? "filter-wrap-btn-icon-teacher" : "filter-wrap-btn-icon-ask"}`}></span>
      </Button>
    </Popover>;
  }
}

Filter.propTypes = {
  onReset: PropTypes.func,
  onFilter: PropTypes.func,
  departments: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
};

Filter.defaultProps = {
  onReset: () => { },
  onFilter: () => { },
  departments: [],
  type: "home",
}

export default Filter;
