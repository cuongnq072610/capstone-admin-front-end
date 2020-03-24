import React from 'react';

const colunms = [
    {
        title: "TITLE",
        dataIndex: "title",
        sorter: (a, b) => a.title < b.title,
        sortDirections: ['descend'],
        render: text => <span style={{ color: '#212121', fontWeight: 600 }}>{text}</span>,
    },
    {
        title: "ACTIVE SUBJECTS",
        dataIndex: "activeSubject",
        sorter: (a, b) => a.activeSubject - b.activeSubject,
        sortDirections: ['descend', 'ascend'],
        render: (text) => <span>{`${text} subjects`}</span>,
    },
];

export default colunms;