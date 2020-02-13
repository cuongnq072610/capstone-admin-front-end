import React from 'react';
import {Icon, Button} from 'antd';
const colunms = [
    {
        dataIndex: "key",
        width: 50,
    },
    {
        title: "TEACHER" ,
        dataIndex: "teacher",
        sorter: (a, b) => a.teacher > b.teacher,
        sortDirections: ['ascend'],
        render: text => <span style={{ color: '#b9754e', fontWeight: 600 }}>{text}</span>,
    },
    {
        title: "E-MAIL",
        dataIndex: "mail",
    },
    {
        title: "COURSES IN CHARGE",
        dataIndex: "courses",
        render: (record) => <span>{record.length} courses</span>,
    },
    {
        title: "RATING",
        dataIndex: "rating",
        render: text => <div><span>{text}</span><span className="icon star-icon"></span>
        
        </div>,
        width: 100
    },
    {
        render: text => <button onClick={()=>this.props.test}>
            <Icon type="plus" className="icon-plus" 
            style={{padding: '3px 5px', color:'#9C4AEE', float:'right', width:'16px', height:'16px'}}/>  
        </button>,
        width: 10
    }
];

export default colunms;