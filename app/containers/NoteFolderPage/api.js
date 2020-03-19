import axiosService from '../../utils/axiosService';

const fetchNoteByFolder = (url) => {
    return axiosService.get(url);
}

export {
    fetchNoteByFolder,
}