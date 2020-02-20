import React from 'react';
import { Tooltip } from 'antd';

const fomatDepartment = (departments) => {
    return departments.map((item, index) => {
        return index !== departments.length - 1 ? item.displayName + " - " : item.displayName
    })
}

const colunms = [
    {
        title: "CODE",
        dataIndex: "courseCode",
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
        dataIndex: "category",
        width: 500,
        render: (text, record) => {
            if (record.category.length <= 3) {
                return (
                    <Tooltip title={fomatDepartment(record.category)} placement="bottomRight">
                        {
                            record.category.map((item, index) => {
                                return (
                                    <span key={index}>
                                        <span>{item.displayName}</span>
                                        {index === record.category.length - 1 ? "" : <span className="ant-divider" />}
                                    </span>
                                )
                            })
                        }
                    </Tooltip>
                )

            } else {
                return (
                    <Tooltip title={fomatDepartment(record.category)} placement="bottomRight">
                        {
                            record.category.map((item, index) => {
                                return (
                                    index < 3 &&
                                    <span key={index}>
                                        <span>{item.displayName}</span>
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