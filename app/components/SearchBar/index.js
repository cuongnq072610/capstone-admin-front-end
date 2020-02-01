/**
 *
 * SearchBar
 *
 */

import React from 'react';
import { Form, Icon, Input } from 'antd';
import './index.scss';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class SearchBar extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleBlur = () => {
    console.log(this.props.form.validateFields);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { message, placeholder } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="search">
        <Form.Item>
          {getFieldDecorator('searchField', {
            rules: [{ required: false, message: `${message}` }],
          })(
            <Input
              prefix={
                <Icon
                  type="search"
                  style={{ color: '#9C4AEE', fontSize: '20px' }}
                />
              }
              placeholder={placeholder}
              className="input"
              onBlur={this.handleBlur}
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}

SearchBar.propTypes = {};

const WrappedSearchBar = Form.create({ name: 'search_bar' })(SearchBar);
export default WrappedSearchBar;