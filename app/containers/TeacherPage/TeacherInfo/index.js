import React, { Fragment } from 'react';
import { Layout, Switch, Icon, Button, Progress } from 'antd';
import "./index.scss";
const { Header } = Layout;

class TeacherInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowModal: false,
            isActive: true,
        }
    }

    componentDidMount() {
        const { teacherInfo } = this.props;
        this.setState({
            isActive: teacherInfo.isActive
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.teacherInfo !== this.props.teacherInfo) {
            this.setState({
                isActive: this.props.teacherInfo.isActive
            })
        }
    }

    handleOnChange = () => {
        this.setState((prevState) => {
            if (prevState.isActive === false) {
                // turn on active, don't open modal
                return {
                    isShowModal: false,
                    isActive: !this.state.isActive,
                }
            } else {
                // turn off active, open modal
                return {
                    isShowModal: !this.state.isShowModal,
                    isActive: !this.state.isActive,
                }
            }
        }, () => {
            const { onActive, teacherInfo } = this.props;
            const { isActive } = this.state;
            if (isActive) {
                onActive(teacherInfo._id, { isActive })
            }
        })
    }

    handleCancel = () => {
        this.setState((prevState) => {
            return {
                isShowModal: !this.state.isShowModal,
                isActive: !prevState.isActive,
            }
        })
    }

    handleDeactivate = () => {
        this.setState({
            isShowModal: !this.state.isShowModal,
            isActive: false,
        }, () => {
            const { onActive, teacherInfo } = this.props;
            const { isActive } = this.state;
            onActive(teacherInfo._id, { isActive })
        })
    }

    renderModal = () => {
        const { isShowModal } = this.state;
        return (
            <div className="modal" style={!isShowModal ? { display: "none" } : {}}>
                <p className="title">Deactivate this tutor ? </p>
                <p className="content">This action will remove all courses this tutor is in charge</p>
                <div className="modal-bottom">
                    <Button className="cancel" onClick={this.handleCancel}>Cancel</Button>
                    <Button className="deactivate" onClick={this.handleDeactivate}>Deactivate</Button>
                </div>
            </div>
        )
    }

    calcRating = (rating) => {
        return (rating.star_1 + rating.star_2 + rating.star_3 + rating.star_4 + rating.star_5) / 5;
    }

    calcRatingStar = (rating, star) => {
        const numb = (star / (rating.star_1 + rating.star_2 + rating.star_3 + rating.star_4 + rating.star_5)) * 100
        return parseFloat(numb.toFixed(1))
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
                    <img src={teacherInfo.avatar} className="avatar" alt="avatar" />
                    <p className="teacher-name">{teacherInfo.teacherName}</p>
                    <p className="teacher-mail">{teacherInfo.email}</p>
                </div>
                <div className="active-teacher">
                    <p className="active-title">Active</p>
                    <Switch
                        checkedChildren={<span className="active-icon active" />}
                        unCheckedChildren={<span className="active-icon inactive" />}
                        checked={this.state.isActive}
                        className="switch-active"
                        onChange={this.handleOnChange}
                    />
                </div>
                {this.renderModal()}
                <div className="rating">
                    <p className="number-rate">{this.calcRating(teacherInfo.rating)}</p>
                    <div className="detail-rating">
                        <div className="progress">
                            <p className="title-rate">5.0 <span className="star-icon"></span></p>
                            <Progress percent={this.calcRatingStar(teacherInfo.rating, teacherInfo.rating.star_5)} size="small" strokeColor="#b9754e" strokeWidth={8} />
                        </div>
                        <div className="progress">
                            <p className="title-rate">4.0 <span className="star-icon"></span></p>
                            <Progress percent={this.calcRatingStar(teacherInfo.rating, teacherInfo.rating.star_4)} size="small" strokeColor="#b9754e" strokeWidth={8} />
                        </div>
                        <div className="progress">
                            <p className="title-rate">3.0 <span className="star-icon"></span></p>
                            <Progress percent={this.calcRatingStar(teacherInfo.rating, teacherInfo.rating.star_3)} size="small" strokeColor="#b9754e" strokeWidth={8} />
                        </div>
                        <div className="progress">
                            <p className="title-rate">2.0 <span className="star-icon"></span></p>
                            <Progress percent={this.calcRatingStar(teacherInfo.rating, teacherInfo.rating.star_2)} size="small" strokeColor="#b9754e" strokeWidth={8} />
                        </div>
                        <div className="progress">
                            <p className="title-rate">1.0 <span className="star-icon"></span></p>
                            <Progress percent={this.calcRatingStar(teacherInfo.rating, teacherInfo.rating.star_1)} size="small" strokeColor="#b9754e" strokeWidth={8} />
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
                                            <Button className="course-name" key={index} onClick={() => { }}>
                                                <p>{course.courseName}</p>
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