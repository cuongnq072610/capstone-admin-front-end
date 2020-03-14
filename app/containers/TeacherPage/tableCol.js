import React from 'react';

const colunms = [
    {
        dataIndex: "avatar",
        width: 50,
        render: text => <img src={text} style={{ width: '30px', height: '30px' }} />
    },
    {
        title: "TEACHER",
        dataIndex: "teacherName",
        sorter: (a, b) => a.teacher < b.teacher,
        sortDirections: ['descend'],
        render: text => <span style={{ color: '#b9754e', fontWeight: 600 }}>{text}</span>,
    },
    {
        title: "E-MAIL",
        dataIndex: "email",
    },
    {
        title: "COURSES IN CHARGE",
        dataIndex: "courses",
        render: (record) => <span>{record.length} courses</span>,
    },
    {
        title: "RATING",
        dataIndex: "rating",
        render: record => {
            var rating = (record.star_1 + record.star_2 + record.star_3 + record.star_4 + record.star_5) / 5;
            return <div><span>{rating}</span><span className="icon star-icon"></span></div>
        },
        width: 100

    },
    {
        dataIndex: "isActive",
        render: (record) => <span className={`icon ${record ? 'true' : 'inactive-icon'}`}></span>,
        width: 20
    },
];

export default colunms;