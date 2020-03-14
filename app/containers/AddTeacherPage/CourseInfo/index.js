import React from 'react';
import { Layout, Icon } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;

const CourseInfo = (props) => {
    const { course } = props;
    return (
        <Layout className="course-information">
            <Header className="course-info-header">
                <span className="icon-course"></span>
                <h1 className="p"><b>Course</b></h1>
            </Header>
            <Content className="course-info-body">
                <div className="course-name ">
                    <p>{course.courseName}</p>
                </div>
                <div className="course-code">
                    <span>COURSE CODE</span>
                    <div className="course-code-content">
                        <span className="icon-course-code"></span>
                        <p>{course.courseCode}</p>
                    </div>
                </div>
                <div className="department">
                    <span>DEPARTMENT</span>
                    {
                        course.departments.map((item, index) => <div className='department-content' key={index}><Icon type="unordered-list" /><p>{item}</p></div>)
                    }
                </div>
                <div className="short-des">
                    <span>SHORT DESCRIPTION</span>
                    <p>{course.shortDes}</p>
                </div>
                <div className="full-des">
                    <span>FULL DESCRIPTION</span>
                    <p>{course.fullDes}</p>
                </div>
            </Content>
        </Layout>
    )
}

export default CourseInfo;