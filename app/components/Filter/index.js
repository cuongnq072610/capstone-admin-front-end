/**
 *
 * Filter
 *
 */

import React from 'react';
import { Layout, Button, Icon } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const mockData = [
  "Business", "Business Communication", "Communication", "Finance", "Graphic Design"
]


/* eslint-disable react/prefer-stateless-function */
class Filter extends React.Component {
  renderCategory = (category, index) => {
    return (
      <div className="category" key={index}>
        <Icon type="unordered-list" />
        <span className="name">{category}</span>
      </div>
    )
  }

  render() {
    const { onFilter, categories } = this.props;
    return <Layout className="wrap">
      <Header style={{backgroundColor: '#fff', color: '#9C4AEE'}}>Filter</Header>
      <Content>
        <Button className="btn" icon="arrow-down" size="large" onClick={onFilter}>Alphabetical</Button>
        <Button className="btn" icon="plus" size="large" >Add category</Button>
        {
          categories.map((category, index) => {
            return this.renderCategory(category, index)
          })
        }
      </Content>
    </Layout>;
  }
}

Filter.propTypes = {};

export default Filter;
