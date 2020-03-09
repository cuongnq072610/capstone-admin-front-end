import React from 'react';
import './index.scss';

const Note = (props) => {
    const { navigateDetail, note, deleteNote } = props;
    return (
        <div className="grid-item note-wrapper grid-item">
            <button className="note-delete" onClick={() => deleteNote(note._id)}>
                <span className="note-delete-icon"></span>
            </button>
            <button className="note-btn" onClick={navigateDetail}>
                <p className="note-title">{note.description}</p>
                <div dangerouslySetInnerHTML={{__html: note.note}} className="note-content"></div>
            </button>
        </div>
    )
}

export default Note;