import React from 'react';
import avatar from '../../../assets/png/man-1.png';
import styled from 'styled-components';
import "./index.scss"
import { Checkbox } from 'antd';

const Name = styled.p`
    color: #212121;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 700;
    margin: 0px;
`;

const Mail = styled.p`
    color: #212121;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 400;
    margin: 0px;
`;

const AskAndAnswerField = (props) => {
    const { user, text, comment, date, isPinned } = props;
    return (
        user ?
            <div className='ask-wrapper'>
                <div style={{ width: '97%' }}>
                    <div className='user-field'>
                        <img src={user.avatar} className='user-avatar' />
                        <div className='user-info'>
                            <div>
                                <Name>{user.email}</Name>
                                <Mail>{user.email}</Mail>
                            </div>
                            <div className="ask-side">
                                <p className='ask-date'> {date ? date : comment.dateCreated}</p>
                            </div>
                        </div>
                    </div>
                    <div className='content-field'>
                        {
                            text ?
                                <div dangerouslySetInnerHTML={{ __html: text }}></div>
                                :
                                <div dangerouslySetInnerHTML={{ __html: comment.message }}></div>
                        }
                    </div>
                </div>
                {(comment) && <Checkbox value={comment.id}></Checkbox>}
            </div>
            :
            ''
    )
}

export default AskAndAnswerField;