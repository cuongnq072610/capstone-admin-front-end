import React from 'react';
import { Col } from 'antd';
import Category from '../../components/Category'
import './box.scss';
const Box = (props) => {
    const {course} = props;
    return (
        <Col span={10} className="wrapper">
            <span>{course.courseId}</span>
            <h2 className="name">{course.courseName}</h2>
            <span>{course.description}</span><br></br>
            <Category category={course.category} color="#9C4AEE"/>
            <span>{course.numberOfTeacher} teachers are tutoring</span>
        </Col>
    )
}

export default Box;