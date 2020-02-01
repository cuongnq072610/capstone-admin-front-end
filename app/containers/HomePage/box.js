import React from 'react';
import { Col } from 'antd';
import Category from '../../components/Category';
import './box.scss';
import { Link } from 'react-router-dom';
const Box = props => {
  const { course } = props;
  return (
    <Col span={12} className="wrapper">
      <Link to="/">
        <div>
          <span>{course.courseId}</span>
          <h2 className="name">{course.courseName}</h2>
          <span>{course.description}</span>
          <br />
          <Category category={course.category} color="#E7CCFF" />
          <span>{course.numberOfTeacher} teachers are tutoring</span>
        </div>
      </Link>
    </Col>
  );
};

export default Box;
