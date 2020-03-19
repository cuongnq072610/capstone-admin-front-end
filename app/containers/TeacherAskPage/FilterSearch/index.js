import React from 'react';
import { Layout, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import message from '../messages';
import "./index.scss";
const { Header, Content } = Layout;

//const sortedTime = colunms.sort((a, b) => b.date - a.date)

class FilterSearch extends React.PureComponent {    
    sortedTime() {
       this.setState(prevState => {
         this.state.colunms.sort((a, b) => (b.date - a.date))
       });
     }
    
    render() {
        return (
            <Layout className="filter-information">
                <Header className="filter-info-header">
                    <h1 className="p"><b><FormattedMessage {...message.filter}/></b></h1>
                </Header>
                <Content className="filter-info-body">
                    <div className="ask-sort">
                        <p><FormattedMessage {...message.sortBy}/></p>
                        <Button className="time-added" onClick={this.sortedTime}>
                            <span className="time-added-icon" size="medium"><FormattedMessage {...message.timeAdded}/></span>
                        </Button>
                    </div>
                    <div className="ask-display">
                        <p><FormattedMessage {...message.display}/></p>
                        <Button className="answered">
                            <span className="answered-icon" size="medium"><FormattedMessage {...message.answer}/></span>
                        </Button>
                        <Button className="unanswered">
                            <span className="unanswered-icon" size="medium"><FormattedMessage {...message.unanswer}/></span>
                        </Button>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default FilterSearch;