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
      <div className="ask-content">
        {
          <span className="ask-icon ask-icon-unread" ></span>
        }
        <span className={`ask-content-ques`}>{text}</span>
      </div>
    )
  },
  dataIndex: "courseName",
  width: 600,
  key: 'courseName'
}
];

export default colunms;
