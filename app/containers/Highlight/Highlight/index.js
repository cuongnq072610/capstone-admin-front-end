import React from 'react';
import './index.scss';

const Note = ({highlight}) => {
    return (
        <div className="highlight-wrapper">
            <button className="note-delete" onClick={() => { }}>
                <span className="note-delete-icon"></span>
            </button>
            <div className="highlight">
                <p>{highlight.content}</p>
            </div>
        </div>
    )
}

export default Note;