import React from 'react';
import { Layout, Button, Row, Rate } from 'antd';
import avatar from '../../../assets/png/man-1.png';
import "./index.scss";
const { Header, Content } = Layout;


const QuestionSide = (props) => {
    const {
        toggleClose,
        toggleDelete,
        isClosed,
        isDelete,
        handleDelete,
        teacher,
    } = props;
    console.log(teacher)
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
                            <img src={avatar} className='tutor-avatar' />
                            <div className='tutor-info'>
                                <span className='tutor-name'>{teacher.teacherName}</span>
                                <span className='tutor-mail'>{teacher.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="session">
                        <span className="p">SESSION</span>
                        {
                            isClosed ?
                                <p className='p-close'><span className='session-close-icon'></span>Question is closed</p> :
                                <Button className="session-close" size="small" onClick={toggleClose}>
                                    <p>Close this question</p>
                                </Button>
                        }
                    </div>
                    {
                        isClosed &&
                        <div className="rate">
                            <span className="p">RATE TUTOR'S SUPPORT</span>
                            <Rate allowClear defaultValue={2.5} className='rate-field' />
                        </div>
                    }
                    <div className="settings">
                        <span className="p">SETTINGS</span>
                        <Button className="settings-delete" size="small" onClick={toggleDelete}>
                            <p>Delete this question</p>
                        </Button>
                        {
                            isDelete &&
                            <div className="setting-modal">
                                <div className="setting-modal-header">
                                    <p>Do you want to delete this question</p>
                                </div>
                                <div className="setting-modal-footer">
                                    <button className="setting-modal-yes" onClick={handleDelete}>Yes</button>
                                    <button className="setting-modal-no" onClick={toggleDelete}>No</button>
                                </div>
                            </div>
                        }
                    </div>
                </Content>
            </Layout>
        </Row>
    )

}

export default QuestionSide;