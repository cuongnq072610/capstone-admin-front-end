import React from 'react';
import { Tooltip } from 'antd';

const fomatDepartment = (departments) => {
    return departments.map((item, index) => {
        return index !== departments.length - 1 ? item + " - " : item
    })
}

const colunms = [
    {
        title: "CODE",
        dataIndex: "courseId",
        sorter: (a, b) => a.courseId < b.courseId,
        sortDirections: ['descend'],
        render: text => <span style={{ color: '#9c4aee', fontWeight: 600 }}>{text}</span>,
    },
    {
        title: "COURSE TITLE",
        dataIndex: "courseName",
    },
    {
        title: "DEPARTMENT",
        dataIndex: "departments",
        width: 500,
        render: (text, record) => {
            if (record.departments.length <= 3) {
                return (
                    <Tooltip title={fomatDepartment(record.departments)} placement="bottomRight">
                        {
                            record.departments.map((item, index) => {
                                return (
                                    <span key={index}>
                                        <span>{item}</span>
                                        {index === record.departments.length - 1 ? "" : <span className="ant-divider" />}
                                    </span>
                                )
                            })
                        }
                    </Tooltip>
                )

            } else {
                return (
                    <Tooltip title={fomatDepartment(record.departments)} placement="bottomRight">
                        {
                            record.departments.map((item, index) => {
                                return (
                                    index < 3 &&
                                    <span key={index}>
                                        <span>{item}</span>
                                        <span className="ant-divider" />
                                    </span>
                                )
                            })
                        }
                        <span>...</span>
                    </Tooltip>
                )
            }
        }
    },
    {
        title: "ACTIVE TUTORS",
        dataIndex: "numberOfTeacher",
        render: text => <span>{text} tutors</span>,
    },
];

export default colunms;