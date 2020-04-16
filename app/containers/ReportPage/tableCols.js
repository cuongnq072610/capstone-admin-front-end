import React from 'react';

const tableColumns = [
    {
        title: "TEACHERS",
        render: (record) => (
            <div className='report-teacher-info'>
                <img src={record.teacherAvatar} className='report-teacher-avatar' />
                <span className='report-teacher-name'>{record.teacherName} </span>
                <span className='report-teacher-mail'>{record.teacherEmail}</span>
            </div>
        )
    },
    {
        title: "COURSES",
        render: (record) => (
            <div className='report-course-info'>
                <span className='report-course-code'>{record.courseCode} </span>
                <span className='report-course-name'>{record.courseName}</span>
            </div>
        )
    },
    {
        title: "NO. OF ASKS",
        width: 150,
        render: (record) => <span>{record.answered + record.unanswered}</span>
    },
    {
        title: "NO. OF ANSWERED ASKS",
        width: 150,
        dataIndex: "answered",
        render: (text) => <span>{text}</span>
    },
    {
        title: "NO. OF UNANSWERED ASKS",
        width: 150,
        dataIndex: "unanswered",
        render: (text) => <span>{text}</span>
    },
    {
        title: "RATING OF TEACHER",
        width: 150,
        dataIndex: "rating",
        render: (text) => <span>{!text ? '0' : text}</span>
    },
];

export default tableColumns;