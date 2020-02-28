/**
 *
 * SearchBar
 *
 */

import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './index.scss';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      showBtn: false
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      showBtn: true
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleSearch(values.searchField)
      }
    });
  };

  handleBlur = () => {
    console.log(this.props.form.validateFields);
  };

  handleOnclickBtn = () => {
    console.log(`check`)
    this.setState({
      showBtn: false
    })
  }

  renderColor = (type) => {
    switch (type) {
      case "home":
        return "#9c4aee";
      case "teacher":
        return "#b9754e";
      case "note":
        return "#ffc143";
      case "ask":
        return "#1593e6";
      case "highlight":
        return "#40a887";
      default:
        break;
    }
  }

  renderClassName = (type) => {
    switch (type) {
      case "home":
        return "homeTheme";
      case "teacher":
        return "teacherTheme";
      case "note":
        return "noteTheme";
      case "ask":
        return "askTheme";
      case "highlight":
        return "highlightTheme";
      default:
        break;
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { message, placeholder, type } = this.props;
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
                  style={{ color: `${this.renderColor(type)}`, fontSize: '20px' }}
                />
              }
              placeholder={placeholder}
              onBlur={this.handleBlur}
              className={`${this.renderClassName(type)}`}
              suffix={<button onClick={this.handleOnclickBtn}><span className='icon-deny'></span></button>}
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
