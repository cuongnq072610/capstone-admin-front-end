import React from 'react';

const formatDate = (date) => {
  var today = new Date(date);
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return today = dd + '/' + mm + '/' + yyyy;
}

const colunms = [
  {
    dataIndex: "student.avatar",
    width: 50,
    render: text => <img src={text} style={{ width: '30px', height: '30px' }} />
  },
  {
    title: "TUTOR",
    dataIndex: "student.name",
    render: text => <span style={{ color: '#1593E6', fontSize: 17, fontWeight: 600 }}>{text}</span>,
    width: 250,
    key: 'student.name'
  },
  {
    title: "QUESTION",
    render: (text, record) => {
      return (
        <div className="ask-content">
          {
            record.status === 'seen' ?
              <span className="ask-icon ask-icon-read" ></span> :
              <span className="ask-icon ask-icon-unread" ></span>
          }
          <p className={`ask-content-ques ${(record.status === 'new' || record.status === 'replied') && "read"}`}>{text}</p>
        </div>
      )
    },
    dataIndex: "askContent",
    width: 600,
    key: 'askContent'
  },
  {
    title: "Time",
    render: (text, record) => {
      return (
        <p>{formatDate(text)}</p>
      )
    },
    dataIndex: "dateModified",
    key: 'dateModified',
    width: 200,
  },
];

export default colunms;
