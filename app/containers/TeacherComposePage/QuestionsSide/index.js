import React from 'react';
import { Layout, Button, Row, Rate } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;


const QuestionSide = (props) => {
    const {
        student,
        rate,
    } = props;
    return (
        <Row>
            <Layout className="questions-information">
                <Header className="questions-info-header">
                    <h1 className="p"><b>Question</b></h1>
                </Header>
                <Content className="questions-info-body">
                    <div className="tutor">
                        <span className="p">STUDENT</span>
                        <div className='tutor-field'>
                            <img src={student.avatar} className='tutor-avatar' />
                            <div className='tutor-info'>
                                <span className='tutor-name'>{student.name}</span>
                                <span className='tutor-mail'>{student.email}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="session">
                            <span className="p">SESSION</span>
                            <p className='p-close'><span className='session-close-icon'></span>Question is closed</p>
                        </div>
                        <div className="rate">
                            <span className="p">RATE TUTOR'S SUPPORT</span>
                            <Rate allowClear defaultValue={2.5} className='rate-field' value={rate} disabled={true} />
                        </div>
                    </div>
                </Content>
            </Layout>
        </Row>
    )

}

export default QuestionSide;