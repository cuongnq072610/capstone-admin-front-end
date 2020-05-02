import React from 'react';
import styled from 'styled-components';
import "./index.scss"
import { converToLocalTime } from '../../../utils/convertLocalTime';

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
    const { user, text, comment, date } = props;
    return (
        user ?
            <div className='ask-wrapper'>
                <div className='user-field'>
                    <img src={user.avatar} className='user-avatar' />
                    <div className='user-info'>
                        <div>
                            <Name>{user.email}</Name>
                            <Mail>{user.email}</Mail>
                        </div>
                        <p>{date ? converToLocalTime(date) : converToLocalTime(comment.dateCreated)}</p>
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
            :
            ''
    )
}

export default AskAndAnswerField;