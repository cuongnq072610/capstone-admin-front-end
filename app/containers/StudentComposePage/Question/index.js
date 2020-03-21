import React from 'react';
import avatar from '../../../assets/png/man-1.png';
import styled from 'styled-components';
import "./index.scss"

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
    const {user, text, comment, date} = props;
    
    return (
        user ?
        <div className='ask-wrapper'>
            <div className='user-field'>
                <img src={avatar} className='user-avatar' />
                <div className='user-info'>
                    <div>
                        <Name>{user.email}</Name>
                        <Mail>{user.email}</Mail>
                    </div>
                    <p>{date ? date : comment.dateCreated}</p>
                </div>
            </div>
            <div className='content-field'>
                <p>{text ? text : comment.message}</p>
            </div>
        </div>
        :
        ''
    )
}

export default AskAndAnswerField;