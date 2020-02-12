import React from 'react';
import {Icon} from 'antd';

const colunms = {
    columnToAdd : [
        {
            dataIndex: "key",
            width: 50,
        },
        {
            title: "TEACHER",
            dataIndex: "teacher",
            sorter: (a, b) => a.teacher < b.teacher,
            sortDirections: ['descend'],
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
            render: text => <div><span>{text}</span><span className="icon star-icon"></span></div>,
            width: 100
    
        },
        {
            render: (record) => <button onClick={()=>{}}>
                <Icon type="plus" className="icon-plus" 
                style={{padding: '3px 5px', color:'#F44336', float:'right'}}/>  
            </button>,
            width: 10
        }
    ],
    columnToRemove : [
        {
            dataIndex: "key",
            width: 50,
        },
        {
            title: "TEACHER",
            dataIndex: "teacher",
            sorter: (a, b) => a.teacher < b.teacher,
            sortDirections: ['descend'],
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
            render: text => <div><span>{text}</span><span className="icon star-icon"></span></div>,
            width: 100
    
        },
        {
            render: (record) => <button onClick={()=>{}}>
                <Icon type="minus" className="icon-minus" 
                style={{padding: '3px 5px', color:'#F44336', float:'right'}}/>  
            </button>,
            width: 10
        }
    ]
};

export default colunms;