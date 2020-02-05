import React from 'react';
import { Layout, Switch, Icon, Button, Progress } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;

import avatar from '../assets/man6.png';

class TeacherInfo extends React.Component {
    render() {
        const { teacherInfo } = this.props;
        // const teacherInfo = {
        //     teacher: "LamPD",
        //     mail: "lampd@fe.edu.vn",
        //     numberOfCourses: 4,
        //     departments: ['Communication Business', 'New Category', 'Communication'],
        //     rating: 2.4,
        //     isActive: true,
        // }

        const { onBack } = this.props;

        return (
            <Layout className="teacher-info">
                <Header className="teacher-info-header">
                    <Button onClick={onBack}>
                        <Icon type="arrow-left" style={{ fontSize: '25px', color: "#b9754e", fontWeight: 600 }} />
                    </Button>
                </Header>
                <div className="title">
                    <img src={avatar} className="avatar" alt="avatar"/>
                    <p className="teacher-name">{teacherInfo.teacher}</p>
                    <p className="teacher-mail">{teacherInfo.mail}</p>
                </div>
                <div className="active-teacher">
                    <p className="active-title">Active</p>
                    <Switch
                        checkedChildren={<span className="active-icon active" />}
                        unCheckedChildren={<span className="active-icon inactive" />}
                        defaultChecked
                        className="switch-active"
                    />
                </div>
                <div className="rating">
                    <p className="number-rate">{teacherInfo.rating}</p>
                    <div className="detail-rating">
                        <div className="progress">
                            <p className="title-rate">5.0 <span className="star-icon"></span></p>
                            <Progress percent={30} size="small" strokeColor="#b9754e" strokeWidth={8}/>
                        </div>
                        <div className="progress">
                            <p className="title-rate">4.0 <span className="star-icon"></span></p>
                            <Progress percent={30} size="small" strokeColor="#b9754e" strokeWidth={8}/>
                        </div>
                        <div className="progress">
                            <p className="title-rate">3.0 <span className="star-icon"></span></p>
                            <Progress percent={30} size="small" strokeColor="#b9754e" strokeWidth={8}/>
                        </div>
                        <div className="progress">
                            <p className="title-rate">2.0 <span className="star-icon"></span></p>
                            <Progress percent={30} size="small" strokeColor="#b9754e" strokeWidth={8}/>
                        </div>
                        <div className="progress">
                            <p className="title-rate">1.0 <span className="star-icon"></span></p>
                            <Progress percent={30} size="small" strokeColor="#b9754e" strokeWidth={8}/>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default TeacherInfo;