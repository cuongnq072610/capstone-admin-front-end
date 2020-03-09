import React from 'react';
import {Icon} from 'antd';

const colunms = {
    columnToAdd : [
        {
            dataIndex: "key",
            width: 50,
        },
        {
            title: "CODE",
            dataIndex: "courseCode",
            sorter: (a, b) => a.teacher < b.teacher,
            sortDirections: ['descend'],
            render: text => <span style={{ color: '#9C4AEE', fontWeight: 600 }}>{text}</span>,
        },
        {
            title: "COURSE TITLE",
            dataIndex: "courseName",
        },
        {
            title: "DEPARTMENT",
            dataIndex: "departments",
            render: (record) => <span>{record.length} courses</span>,
        },
        {
            title: "ACTIVE TUTORS",
            dataIndex: "dateCreated",
            render: record => {
                var rating = (record.star_1 + record.star_2 + record.star_3 + record.star_4 + record.star_5)/5;
                return <div><span>{rating}</span><span className="icon star-icon"></span></div>
            },
            width: 100
    
        },
        {
            render: (record) => <button onClick={()=>{}}>
                <Icon type="plus" className="icon-plus" 
                style={{padding: '3px 5px', color:'#9C4AEE', float:'right', width:'16px', height:'16px'}}/>  
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
            title: "CODE",
            dataIndex: "courseCode",
            sorter: (a, b) => a.teacher < b.teacher,
            sortDirections: ['descend'],
            render: text => <span style={{ color: '#9C4AEE', fontWeight: 600 }}>{text}</span>,
        },
        {
            title: "COURSE TITLE",
            dataIndex: "courseName",
        },
        {
            title: "DEPARTMENT",
            dataIndex: "departments",
            render: (record) => <span>{record.length} courses</span>,
        },
        {
            title: "ACTIVE TUTORS",
            dataIndex: "dateCreated",
            render: record => {
                var rating = (record.star_1 + record.star_2 + record.star_3 + record.star_4 + record.star_5)/5;
                return <div><span>{rating}</span><span className="icon star-icon"></span></div>
            },
            width: 100
    
        },
        {
            render: (record) => <button onClick={()=>{}}>
                <Icon type="minus" className="icon-minus" 
                style={{padding: '3px 5px', color:'#F44336', float:'right', width:'16px', height:'16px'}}/>  
            </button>,
            width: 10
        }
    ]
};

export default colunms;