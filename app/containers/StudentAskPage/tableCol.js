import React from 'react';

const colunms = [{
    // dataIndex: "key",
    width: 50,
  },
  {
    title: "TUTOR",
    dataIndex: "teacher",
    render: text => <span style={{ color: '#1593E6', fontSize: 15, fontWeight: 600 }}>{text}</span>,
    width: 175,
  },
  {
    title: "E-MAIL",
    render: (text, record) =>{
        console.log(record)
        return(<div>
        <span className="answered-icon" size="medium" style={{fontSize: 15}}></span>
        <p>{text}</p>
    </div>)},
    dataIndex: "question",
    width: 600,
  },
  {
    title: "Time",
    dataIndex: "date",
  },
];

export default colunms;
