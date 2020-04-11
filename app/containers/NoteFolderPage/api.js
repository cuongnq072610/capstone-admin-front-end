import axiosService from '../../utils/axiosService';

const fetchNoteByFolder = (url) => {
    return axiosService.get(url);
}

const deleteNote = (url) => {
    return axiosService.delete(url);
}

const deleteFolder = (url) => {
    return axiosService.delete(url);
}

export {
    fetchNoteByFolder,
    deleteNote,
    deleteFolder,
}