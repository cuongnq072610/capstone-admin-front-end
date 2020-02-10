import React, { Fragment } from 'react';
import { Layout } from 'antd';
import "./index.scss";
const { Header } = Layout;

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
                    <h1><b>Course</b></h1>
                </Header>
            </Layout>
        )
    }
}

export default CourseInfo;