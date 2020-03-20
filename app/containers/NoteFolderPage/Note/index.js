import React from 'react';
import './index.scss';
import { Spin, Icon } from 'antd';

const Note = (props) => {
    const { navigateDetail, note, deleteNote, isLoading } = props;
    const antIconSave = <Icon type="loading" style={{ fontSize: 15, color: '#fff', marginRight: '10px' }} spin />;

    return (
        <div className="grid-item note-wrapper grid-item">
            <button className="note-delete" onClick={() => deleteNote(note._id)}>
                {
                    isLoading ? <Spin indicator={antIconSave} /> : <span className="note-delete-icon"></span>
                }
            </button>
            <button className="note-btn" onClick={navigateDetail}>
                <p className="note-title">{note.description}</p>
                <div dangerouslySetInnerHTML={{ __html: note.scannedContent }} className="note-content"></div>
            </button>
        </div>
    )
}

export default Note;