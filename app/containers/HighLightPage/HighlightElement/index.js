import React from 'react';
import './index.scss';
import { Icon, Spin } from 'antd';

const HighLight = (props) => {
    const { highlight, deleteHighlight, isLoading, onGoTo } = props;
    const antIconSave = <Icon type="loading" style={{ fontSize: 15, color: '#fff', marginRight: '10px' }} spin />;

    return (
        <div className={'grid-item highlight-wrapper background-' + highlight.color} onClick={() => onGoTo(highlight.url)}>
            <button className="highlight-delete" onClick={() => deleteHighlight(highlight._id)}>
                {
                    isLoading ? <Spin indicator={antIconSave} /> : <span className="highlight-delete-icon"></span>
                }
            </button>
            <div className="highlight">
                <p>{highlight.scannedContent}</p>
            </div>
        </div>
    )
}

export default HighLight;