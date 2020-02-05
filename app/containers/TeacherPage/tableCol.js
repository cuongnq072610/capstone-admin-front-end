import React from 'react';

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
        dataIndex: "numberOfCourses",
        render: text => <span>{text} courses</span>,
    },
    {
        title: "RATING",
        dataIndex: "rating",
        render: text => <div><span>{text}</span><span className="icon star-icon"></span></div>,
        width: 100

    },
    {
        dataIndex: "isActive",
        render: (record) => <span className={`icon ${record ? 'true' : 'inactive-icon'}`}></span>,
        width: 20
    },
];

export default colunms;