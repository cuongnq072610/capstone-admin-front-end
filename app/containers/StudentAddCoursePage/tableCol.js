import React from 'react';
import { Icon, Tooltip } from 'antd';

const fomatDepartment = (departments) => {
    return departments.map((item, index) => {
        return index !== departments.length - 1 ? item + " - " : item
    })
}

const colunms = {
    columnToAdd: [
        {
            dataIndex: "key",
            width: 50,
        },
        {
            title: "CODE",
            dataIndex: "courseCode",
            sorter: (a, b) => a.teacher < b.teacher,
            sortDirections: ['descend'],
            render: text => <span style={{ color: '#1593e6', fontWeight: 600 }}>{text}</span>,
        },
        {
            title: "COURSE TITLE",
            dataIndex: "courseName",
        },
        {
            title: "DEPARTMENT",
            dataIndex: "departments",
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
            dataIndex: "teachers",
            render: record => <span>{record.length} teachers</span>,
            width: 100

        },
        {
            render: (record) => <button onClick={() => { }}>
                <Icon type="plus" className="icon-plus"
                    style={{ padding: '3px 5px', color: '#1593e6', float: 'right', width: '16px', height: '16px' }} />
            </button>,
            width: 10
        }
    ],
    columnToRemove: [
        {
            dataIndex: "key",
            width: 50,
        },
        {
            title: "CODE",
            dataIndex: "courseCode",
            sorter: (a, b) => a.teacher < b.teacher,
            sortDirections: ['descend'],
            render: text => <span style={{ color: '#1593e6', fontWeight: 600 }}>{text}</span>,
        },
        {
            title: "COURSE TITLE",
            dataIndex: "courseName",
        },
        {
            title: "DEPARTMENT",
            dataIndex: "departments",
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
            dataIndex: "teachers",
            render: record => <span>{record.length} teachers</span>,
            width: 100

        },
        {
            render: (record) => <button onClick={() => { }}>
                <Icon type="minus" className="icon-minus"
                    style={{ padding: '3px 5px', color: '#1593e6', float: 'right', width: '16px', height: '16px' }} />
            </button>,
            width: 10
        }
    ]
};

export default colunms;