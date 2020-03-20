import React from 'react';

const colunms = [{
  // dataIndex: "key",
  width: 50,
},
{
  title: "TUTOR",
  dataIndex: "teacher.teacherName",
  render: text => <span style={{ color: '#1593E6', fontSize: 17, fontWeight: 600 }}>{text}</span>,
  width: 175,
  key: 'teacher.teacherName'
},
{
  title: "QUESTION",
  render: (text, record) => {
    return (
      <div className="ask-content">
        {
          record.isReaded ?
            <span className="ask-icon ask-icon-read" ></span> :
            <span className="ask-icon ask-icon-unread" ></span>
        }
        <p className={`ask-content-ques ${record.isReaded && "read"}`}>{text}</p>
      </div>
    )
  },
  dataIndex: "askContent",
  width: 600,
  key: 'askContent'
},
{
  title: "Time",
  dataIndex: "dateModified",
  key : 'dateModified'
},
];

export default colunms;
