import React from 'react';
import "./box.scss";
const Box = (props) => {
    const { name } = props;
    return (
        <div className="box-container" style={name === "Course" ? { backgroundColor: "#9c4aee" } : { backgroundColor: "#b9754e" }}>
            <div className="box-header">
                <span className={`box-icon ${name === "Course" ? "box-course" : "box-teacher"}`}></span>
                <p>{name}</p>
            </div>
            <div className="box-content">
                {
                    name === 'Teacher' ?
                    <div className="teacher-active-wrapper">
                        <span className="box-icon box-active"></span>
                        <p>5</p>
                    </div> : <div></div>
                }
                <p>8</p>
            </div>
        </div>
    )
}

export default Box;