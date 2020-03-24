import React from 'react'
import './message.scss'

const Message = ({user, message}) => (
    <div className="message">
        <div className="message__userInfo">
            <img src="https://i.imgur.com/hVx1hrb.png"></img>
            <div classNam="message__userInfo__text">
                <h5>User-Beta</h5>
                <p>userbeta@noteit.co.vn</p>
            </div>
            <p className="time">09:29</p>
        </div>
        <p>Is it because of Google or just himself?</p>
    </div>
)

export default Message;