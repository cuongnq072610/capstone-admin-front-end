import React from 'react';
import './index.scss';

const Note = (props) => {
    const { navigateDetail, note } = props;
    return (
        <div className="grid-item note-wrapper grid-item">
            <button className="note-delete" onClick={() => { }}>
                <span className="note-delete-icon"></span>
            </button>
            <button className="note-btn" onClick={navigateDetail}>
                <p className="note-title">{note.title}</p>
                <p className="note-content">{note.content}</p>
            </button>
        </div>
    )
}

export default Note;