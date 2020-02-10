import React from 'react';
import {Icon} from 'antd';
const colunms = [
    {
        dataIndex: "key",
        width: 50,
    },
    {
        title: "TEACHER",
        dataIndex: "teacher",
        sorter: (a, b) => a.teacher < b.teacher,
        sortDirections: ['descend'],
        render: text => <span style={{ color: '#b9754e', fontWeight: 600 }}>{text}</span>,
    },
    {
        title: "E-MAIL",
        dataIndex: "mail",
    },
    {
        title: "COURSES IN CHARGE",
        dataIndex: "courses",
        render: (record) => <span>{record.length} courses</span>,
    },
    {
        title: "RATING",
        dataIndex: "rating",
        render: text => <div><span>{text}</span><span className="icon star-icon"></span>
        <span><Icon type="minus"/></span>
        </div>,
        width: 100

    },
];

export default colunms;