import React from 'react';
import './index.scss';

const Note = (props) => {
    const { navigateDetail, note } = props;
    return (
        <button className="note-wrapper" onClick={navigateDetail}>
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
        </button>
    )
}

export default Note;