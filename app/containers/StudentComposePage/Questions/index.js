import React, { Fragment } from 'react';
import { Layout, Icon, Button, Input, Row } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;


class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <Row>
                <Layout className="questions-information">
                    <Header className="questions-info-header">
                        <h1 className="p"><b>Question</b></h1>
                    </Header>
                    <Content className="questions-info-body">
                        <div className="tutor">
                            <span className="p">TUTOR</span>
                        </div>
                        <div className="session">
                            <span className="p">SESSION</span>
                            <Button className="session-close" size="medium">
                                <p>Close this question</p>
                            </Button>
                        </div>
                        <div className="settings">
                            <span className="p">SETTINGS</span>
                            <Button className="settings-delete" size="medium">
                                <p>Delete this question</p>
                            </Button>
                        </div>
                    </Content>
            </Layout>
            </Row>
        )
    }
}

export default Questions;