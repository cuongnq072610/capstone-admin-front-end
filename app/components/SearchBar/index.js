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
class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
        this.props.handleSearch(values.searchField)
      } else {
        console.log(err)
      }
    });
  };

  handleOnclickBtn = () => {
    this.setState({
      showBtn: false
    })
    this.props.handleClear();
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
    const { showBtn } = this.state;
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
              className={`${this.renderClassName(type)}`}
              suffix={showBtn && <span onClick={this.handleOnclickBtn} className='icon-deny'></span>}
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
