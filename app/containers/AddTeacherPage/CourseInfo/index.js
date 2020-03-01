import React, { Fragment } from 'react';
import { Layout, Input, Icon } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;

class CourseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { course } = this.props;
        console.log(course)
        return (
            <Layout className="course-information">
                <Header className="course-info-header">
                    <h1 className="p"><b>Course</b></h1>
                </Header>
                <Content className="course-info-body">
                    <div className="course-name ">
                        <p>{course.courseName}</p>
                    </div>
                    <div className="course-code">
                        <span>COURSE CODE</span>
                        <div className="course-code-content">
                            <Icon type="key" />
                            <p>{course.courseCode}</p>
                        </div>
                    </div>
                    <div className="department">
                        <span>DEPARTMENT</span>
                        {
                            course.departments.map((item, index) => <div className='department-content'><Icon type="unordered-list" /><p>{item}</p></div>)
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
}

export default CourseInfo;