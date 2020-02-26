import React, { Fragment } from 'react';
import { Layout, Input ,Icon } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;

class CourseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <Layout className="course-information">
                <Header className="course-info-header">
                    <h1 className="p"><b>Course</b></h1>
                </Header>
                <Content className="course-info-body">
                    <div className="course-name">
                        <textarea className="p" value='Datawarehousing for IT engineers'/>
                    </div>
                    <div className="course-code">
                        <span className="p1">COURSE CODE</span>
                        <Input className="course-code-input" value='DBW101'></Input>
                    </div>
                    <div className="department">
                        <span className="p2">DEPARTMENT</span>
                        <Input  className="department-input" value='Data Warehouse'/>
                    </div>
                    <div className="short-des">
                        <span className="p3">SHORT DESCRIPTION</span>
                        <div className="short-des-input">This is a fundamental course 
                                for software engineers to get
                                to know what involves in the
                                running process of a
                                database organizing in 
                                entrepreneurs.</div>
                    </div>
                    <div className="full-des">
                        <span className="p4">FULL DESCRIPTION</span>
                        <div className="full-des-input">Database is the bone of
                                every product and company.
                                Understanding the principles
                                of it is crucial for every dev
                                today.</div>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default CourseInfo;