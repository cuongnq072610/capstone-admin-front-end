import React from 'react';
import "./box.scss";
import { Button, Icon, Spin } from 'antd';
const Box = (props) => {
    const { name, onNavigate, isLoading, statistic } = props;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#fff', marginRight: '10px' }} spin />;
    return (
        <Button className="box-container" style={name === "Course" ? { backgroundColor: "#9c4aee" } : { backgroundColor: "#b9754e" }} onClick={onNavigate}>
            <div className="box-header">
                <span className={`box-icon ${name === "Course" ? "box-course" : "box-teacher"}`}></span>
                <p>{name}</p>
            </div>
            <div className="box-content">
                {
                    name === 'Teacher' ?
                        <div className="teacher-active-wrapper">
                            <span className="box-icon box-active"></span>
                            <p>
                                {
                                    isLoading ?
                                        <Spin indicator={antIcon} /> :
                                        statistic.numOfActiveTeacher
                                }
                            </p>
                        </div> : <div></div>
                }
                <p>
                    {
                        isLoading ?
                            <Spin indicator={antIcon} /> :
                            name === 'Teacher' ? statistic.numOfTeacher : statistic.numOfCourse
                    }
                </p>
            </div>
        </Button>
    )
}

export default Box;
