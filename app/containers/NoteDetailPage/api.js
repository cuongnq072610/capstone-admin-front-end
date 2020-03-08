import axiosService from '../../utils/axiosService';

const fetchNote = (url) => {
    return axiosService.get(url);
}

const updateNote = (url, body) => {
    return axiosService.put(url, body);
}

export {
    fetchNote,
    updateNote,
}