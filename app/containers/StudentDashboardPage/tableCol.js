import React from 'react';

const colunms = [
  {
    title: "CODE",
    dataIndex: "courseCode",
    render: text => <span className="course-code">{text}</span>,
    width: 150,
    key: 'courseCode'
  },
  {
    title: "COURSE TITLE",
    render: (text, record) => {
      return (
        <span>{text}</span>
      )
    },
    dataIndex: "courseName",
    width: 600,
    key: 'courseName'
  }
];

export default colunms;
