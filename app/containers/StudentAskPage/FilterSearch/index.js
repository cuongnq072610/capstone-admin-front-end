import React, { Fragment } from 'react';
import { Layout, Icon, Button, Input } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;

class FilterSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
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
                        <Button className="time-added">
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