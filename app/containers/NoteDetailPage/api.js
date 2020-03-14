import axiosService from '../../utils/axiosService';

const fetchNote = (url) => {
    return axiosService.get(url);
}

const updateNote = (url, body) => {
    return axiosService.put(url, body);
}

const deleteNote = (url) => {
    return axiosService.delete(url);
}

export {
    fetchNote,
    updateNote,
    deleteNote,
}