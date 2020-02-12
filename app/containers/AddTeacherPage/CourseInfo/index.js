import React, { Fragment } from 'react';
import { Layout } from 'antd';
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
            <Layout className="course-info">
                <Header className="course-info-header">
                    <h1 className="p"><b>Course</b></h1>
                </Header>
                <Content className="course-info-body">
                    <div>
                        
                    </div>
                <div className="course-code">
                    <span>COURSE CODE</span>
                </div>
                <div className="department">
                    <span>DEPARTMENT</span>
                </div>
                <div className="short-des">
                    <span>SHORT DESCRIPTION</span>
                </div>
                <div className="full-des">
                    <span>FULL DESCRIPTION</span>
                </div>
                </Content>
            </Layout>
        )
    }
}

export default CourseInfo;