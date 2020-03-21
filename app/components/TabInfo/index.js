import React from 'react';
import './index.scss'

const TabInfo = ({ numberCourse, quantity, type }) => {
    return (
        <div className={`tab-info-${type}`}>
            <div className='tab-folder'>
                <span className='tab-icon icon-course'></span>
                <p>{numberCourse}</p>
            </div>
            <div className='tab-folder'>
                <span className={`tab-icon icon-${type}`}></span>
                <p>{quantity}</p>
            </div>
        </div>
    )
}

export default TabInfo;