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
                    <div className="course-name ">
                        <input className='course-name-input' value='no course name'/>
                    </div>
                    <div className="course-code">
                        <span>COURSE CODE</span>
                        <Input prefix={<Icon type="key" />} value='DBW101'></Input>
                    </div>
                    <div className="department">
                        <span>DEPARTMENT</span>
                        <Input  className="department-input" value='Data Warehouse' prefix={<Icon type="unordered-list" />}/>
                    </div>
                    <div className="short-des">
                        <span>SHORT DESCRIPTION</span>
                        <input className="short-des-input" value='no short description'/>
                    </div>
                    <div className="full-des">
                        <span>FULL DESCRIPTION</span>
                        <input className="full-des-input" value='no full description'/>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default CourseInfo;