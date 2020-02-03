/**
 *
 * Filter
 *
 */

import React from 'react';
import { Layout, Form, Icon, Input, Button } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department: ""
    }
  }

  renderDepartments = (category, index) => {
    const { onFilter } = this.props;
    return (
      <Button className="category" key={index} onClick={() => onFilter(category)}>
        <span className="category-icon"></span>
        <span className="name">{category}</span>
      </Button>
    )
  }

  onChangeText = (e) => {
    this.setState({
      department: e.target.value,
    })
  }

  // handleAdd = (e) => {
  //   e.preventDefault();
  //   this.props.handleAdd(this.state.department);
  // }

  render() {
    const { departments } = this.props;
    return <Layout className="wrap">
      <Header style={{ backgroundColor: '#fff', color: '#9C4AEE' }}>Departments</Header>
      <Content>
        {/* <Form onSubmit={this.handleAdd}>
          <Input
            placeholder="Add new department"
            prefix={<Icon type="plus" style={{ color: '#9c4aee' }} />}
            className="addDepartment"
            onChange={this.onChangeText}
          />
        </Form> */}
        <Button className="clearFilter">
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
  handleAdd: PropTypes.func,
  onFilter: PropTypes.func,
  departments: PropTypes.arrayOf(PropTypes.string)
};

Filter.defaultProps = {
  handleAdd: () => { },
  onFilter: () => { },
  departments: [],
}

export default Filter;
