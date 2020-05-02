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
        title: "NO. OF QUESTIONS",
        width: 150,
        render: (record) => <span>{record.open + record.closed}</span>
    },
    {
        title: "NO. OF OPENED QUESTIONS",
        width: 150,
        dataIndex: "open",
        render: (text) => <span>{text}</span>
    },
    {
        title: "NO. OF CLOSED QUESTIONS",
        width: 150,
        dataIndex: "closed",
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