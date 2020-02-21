import React, { Fragment } from 'react';
import { Layout, Icon, Button, Input } from 'antd';
import "./index.scss";
import colunms from '../tableCol';
const { Header, Content } = Layout;

const mockData = [
    {
        teacher: "LamPD",
        mail: "lampd@fe.edu.vn",
        date: '18:20',
    },
    {
        teacher: "MaiTT",
        mail: "maitt6@fe.edu.vn",
        date: '14:57',
    },
    {
        teacher: "MaiVTT",
        mail: "maitt@fe.edu.vn",
        date: 'Dec 19',
    },
    {
        teacher: "PhuongLh7",
        mail: "phuonglh7@fe.edu.vn",
        date: 'Dec 17',
    },
    {
      teacher: "TungNN13",
      mail: "phuonglh7@fe.edu.vn",
      date: 'Dec 16',
    },
    {
      teacher: "NguyetTM22",
      mail: "phuonglh7@fe.edu.vn",
      date: 'Dec 15',
    },
]

//const sortedTime = colunms.sort((a, b) => b.date - a.date)

class FilterSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    sortedTime() {
       this.setState(prevState => {
         this.state.colunms.sort((a, b) => (b.date - a.date))
       });
     }

    
    render() {
        return (
            <Layout className="filter-information">
                <Header className="filter-info-header">
                    <h1 className="p"><b>Filter</b></h1>
                </Header>
                <Content className="filter-info-body">
                    <div className="ask-sort">
                        <p>SORT BY</p>
                        <Button className="time-added" onClick={this.sortedTime}>
                            <span className="time-added-icon" size="medium">Time added</span>
                        </Button>
                    </div>
                    <div className="ask-display">
                        <p>DISPLAY</p>
                        <Button className="answered">
                            <span className="answered-icon" size="medium">Answered questions</span>
                        </Button>
                        <Button className="unanswered">
                            <span className="unanswered-icon" size="medium">Unanswered questions</span>
                        </Button>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default FilterSearch;