import React, { Fragment } from 'react';
import { Layout, Switch, Icon, Button, Progress } from 'antd';
import "./index.scss";
const { Header } = Layout;

import avatar from '../assets/man6.png';

class TeacherInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
        }
    }

    handleOnChange = () => {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }

    handleCancel = () => {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }

    handleDeactivate = () => {
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }

    renderModal = () => {
        const { isShowModal } = this.state;
        return (
            <div className="modal" style={!isShowModal ? {display: "none"} : {}}>
                <p className="title">Deactivate this tutor ? </p>
                <p className="content">This action will remove all courses this tutor is in charge</p>
                <div className="modal-bottom">
                    <Button className="cancel" onClick={this.handleCancel}>Cancel</Button>
                    <Button className="deactivate" onClick={this.handleDeactivate}>Deactivate</Button>
                </div>
            </div>
        )
    }

    render() {
        const { teacherInfo, onBack } = this.props;
        return (
            <Layout className="teacher-info">
                <Header className="teacher-info-header">
                    <Button onClick={onBack}>
                        <Icon type="arrow-left" style={{ fontSize: '25px', color: "#b9754e", fontWeight: 600 }} />
                    </Button>
                </Header>
                <div className="title">
                    <img src={avatar} className="avatar" alt="avatar" />
                    <p className="teacher-name">{teacherInfo.teacher}</p>
                    <p className="teacher-mail">{teacherInfo.mail}</p>
                </div>
                <div className="active-teacher">
                    <p className="active-title">Active</p>
                    <Switch
                        checkedChildren={<span className="active-icon active" />}
                        unCheckedChildren={<span className="active-icon inactive" />}
                        // checked={teacherInfo.isActive}
                        defaultChecked
                        className="switch-active"
                        onChange={this.handleOnChange}
                    />
                </div>
                {this.renderModal()}
                <div className="rating">
                    <p className="number-rate">{teacherInfo.rating}</p>
                    <div className="detail-rating">
                        <div className="progress">
                            <p className="title-rate">5.0 <span className="star-icon"></span></p>
                            <Progress percent={30} size="small" strokeColor="#b9754e" strokeWidth={8} />
                        </div>
                        <div className="progress">
                            <p className="title-rate">4.0 <span className="star-icon"></span></p>
                            <Progress percent={30} size="small" strokeColor="#b9754e" strokeWidth={8} />
                        </div>
                        <div className="progress">
                            <p className="title-rate">3.0 <span className="star-icon"></span></p>
                            <Progress percent={30} size="small" strokeColor="#b9754e" strokeWidth={8} />
                        </div>
                        <div className="progress">
                            <p className="title-rate">2.0 <span className="star-icon"></span></p>
                            <Progress percent={30} size="small" strokeColor="#b9754e" strokeWidth={8} />
                        </div>
                        <div className="progress">
                            <p className="title-rate">1.0 <span className="star-icon"></span></p>
                            <Progress percent={30} size="small" strokeColor="#b9754e" strokeWidth={8} />
                        </div>
                    </div>
                </div>
                <div className="courses">
                    <div className="course-head">
                        <span className="course-icon"></span>
                        <p className="course-title">Courses</p>
                    </div>
                    {
                        teacherInfo.isActive ?
                            <Fragment>
                                <p>{`Currently tutoring ${teacherInfo.courses.length} courses`}</p>
                                {
                                    teacherInfo.courses.map((course, index) => {
                                        return (
                                            <Button className="course-name" key={index} onClick={() => {}}>
                                                <p>{course}</p>
                                                <span className="delete-icon"></span>
                                            </Button>
                                        )
                                    })
                                }
                            </Fragment> : <p>Currently inactive</p>
                    }
                </div>
            </Layout>
        )
    }
}

export default TeacherInfo;