/**
 *
 * Filter
 *
 */

import React from 'react';
import { Layout, Button, Popover } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class Filter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chosenDepartments: [],
      activeType: "",
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
      activeType: ""
    })
  }

  handleChooseActiveType = (type) => {
    const { onFilter } = this.props;
    this.setState({
      activeType: type
    }, () => {
      onFilter(this.state.activeType)
    })
  }

  render() {
    const { activeType } = this.state;
    const { departments, type } = this.props;
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
        <div className="filter-active">
          <span className="icon-filter-active"></span>
          <p>Display:</p>
          <Button onClick={() => this.handleChooseActiveType("active")} className={`filter-active-btn filter-active-btn-${activeType === 'active' && 'chosen'}`}>active</Button>
          <Button onClick={() => this.handleChooseActiveType("inactive")} className={`filter-active-btn filter-active-btn-${activeType === 'inactive' && 'chosen'}`}>inactive</Button>
        </div>
      }
      <Button className={`clearBtn ${type === "home" ? "clearBtnHomeTheme" : "clearBtnTeacherTheme"}`} onClick={this.handleReset}>
        <span>Clear filter</span>
      </Button>
    </Layout>;
    return <Popover
      placement="bottomRight"
      title="Filter"
      trigger="click"
      content={content}
    >
      <Button className={`filter-wrap-btn ${type === "home" ? "filter-home-btn" : type === 'teacher' ? "filter-teacher-btn" : ""}`}>
        <span className={`filter-wrap-btn-icon ${type === "home" ? "filter-wrap-btn-icon-course" : type === 'teacher' ? "filter-wrap-btn-icon-teacher" : ""}`}></span>
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
