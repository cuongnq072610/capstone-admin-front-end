import React from 'react';
import { Layout, Button, Row, Rate, Spin, Icon } from 'antd';
import "./index.scss";
const { Header, Content } = Layout;


const QuestionSide = (props) => {
    const {
        toggleClose,
        isClosed,
        teacher,
        handleRate,
        handleCloseAsk,
        isLoadingClose,
        rate,
        isCloseToggle,
    } = props;
    const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#1593e6', marginRight: '10px' }} spin />;
    return (
        <Row>
            <Layout className="questions-information">
                <Header className="questions-info-header">
                    <h1 className="p"><b>Question</b></h1>
                </Header>
                <Content className="questions-info-body">
                    <div className="tutor">
                        <span className="p">TUTOR</span>
                        <div className='tutor-field'>
                            <img src={teacher.avatar} className='tutor-avatar' />
                            <div className='tutor-info'>
                                <span className='tutor-name'>{teacher.teacherName}</span>
                                <span className='tutor-mail-side'>{teacher.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="session">
                        <span className="p">SESSION</span>
                        {
                            isCloseToggle || isClosed ?
                                <p className='p-close'><span className='session-close-icon'></span>Question is closed</p> :
                                <Button className="session-close" size="small" onClick={toggleClose}>
                                    <p>Close this question</p>
                                </Button>
                        }
                    </div>
                    {
                        isCloseToggle || isClosed ?
                            <div className="rate">
                                <span className="p">RATE TUTOR'S SUPPORT</span>
                                <Rate allowClear defaultValue={2.5} className='rate-field' onChange={handleRate} value={rate} disabled={isClosed} /><br></br>
                                {
                                    !isClosed &&
                                    <div className='rate-footer'>
                                        <Button onClick={handleCloseAsk}>
                                            {
                                                isLoadingClose ?
                                                    <Spin indicator={antIcon} /> :
                                                    <span>Done</span>
                                            }
                                        </Button>
                                        <Button onClick={toggleClose} >Cancel</Button>
                                    </div>
                                }
                            </div> : ""
                    }

                </Content>
            </Layout>
        </Row >
    )

}

export default QuestionSide;