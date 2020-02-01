import React from 'react';

const colunms = [
    {
        title: "CODE",
        dataIndex: "courseId",
        sorter: (a, b) => a.courseId < b.courseId,
        sortDirections: ['descend'],
        render: text => <span style={{color: '#9c4aee'}}>{text}</span>,
    },
    {
        title: "COURSE title",
        dataIndex: "courseName",
    },
    {
        title: "DEPARTMENT",
        dataIndex: "category",

    },
    {
        title: "ACTIVE TUTORS",
        dataIndex: "numberOfTeacher",
        render: text => <span>{text} tutors</span>,
    },
];

export default colunms;