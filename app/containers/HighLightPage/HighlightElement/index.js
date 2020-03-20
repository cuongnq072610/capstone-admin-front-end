import React from 'react';
import './index.scss';

const Note = ({highlight}) => {
    return (
        <div className={'grid-item highlight-wrapper background-'+highlight.color}>
            <button className="highlight-delete" onClick={() => { }}>
                <span className="highlight-delete-icon"></span>
            </button>
            <div className="highlight">
                <p>{highlight.scannedContent}</p>
            </div>
        </div>
    )
}

export default Note;