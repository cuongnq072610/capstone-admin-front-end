/**
 *
 * Filter
 *
 */

import React from 'react';
import { Layout, Button } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDepartments: [],
    }
  }

  handleFilter = (department) => {
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

  isCheck = (department) => {
    return this.state.chosenDepartments.includes(department);
  }

  renderDepartments = (department, index) => {
    const { type } = this.props;
    return (
      <Button className={`category ${type === "home" ? "categoryHomeTheme" : "categoryTeacherTheme"}`} key={index} onClick={() => this.handleFilter(department)}>
        <span className={`icon ${this.isCheck(department) ? "check-icon" : "category-icon"}`}></span>
        <span className="name">{department}</span>
      </Button>
    )
  }

  handleReset = () => {
    this.props.onReset();
    this.setState({
      chosenDepartments: []
    })
  }

  render() {
    const { departments, type } = this.props;
    return <Layout className="wrap">
      <Header style={{ backgroundColor: '#fff', color: `${type === "home" ? "#9C4AEE" : "#b9754e"}` }}>Departments</Header>
      <Content>
        <Button className={`clearBtn ${type === "home" ? "clearBtnHomeTheme" : "clearBtnTeacherTheme"}`} onClick={this.handleReset}>
          <span>Clear filter</span>
        </Button>
        {
          departments.map((department, index) => {
            return this.renderDepartments(department, index)
          })
        }
      </Content>
    </Layout>;
  }
}

Filter.propTypes = {
  onReset: PropTypes.func,
  onFilter: PropTypes.func,
  departments: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
};

Filter.defaultProps = {
  onReset: () => { },
  onFilter: () => { },
  departments: [],
  type: "home",
}

export default Filter;
