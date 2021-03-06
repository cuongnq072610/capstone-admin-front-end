import React from 'react';

const colunms = [
    {
        title: "TITLE",
        dataIndex: "name",
        sorter: (a, b) => a.name < b.name,
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