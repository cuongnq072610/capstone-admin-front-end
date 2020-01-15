/**
 *
 * Category
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './index.scss';

function Category(props) {
  const { category, color } = props;
  return (
    <div className="category" style={{ backgroundColor: `${color}` }}>
      <span>{category}</span>
    </div>
  );
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Category;
