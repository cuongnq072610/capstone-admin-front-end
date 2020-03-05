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
    const {
        user,
        content,
    } = props;
    return (
        <div className='ask-wrapper'>
            <div className='user-field'>
                <img src={avatar} className='user-avatar' />
                <div className='user-info'>
                    <div>
                        <Name>User-Beta</Name>
                        <Mail>userbeta@noteit.co.vn</Mail>
                    </div>
                    <p>09:29</p>
                </div>
            </div>
            <div className='content-field'>
                <p>Is it because of Google or just himseft</p>
            </div>
        </div>
    )
}

export default AskAndAnswerField;