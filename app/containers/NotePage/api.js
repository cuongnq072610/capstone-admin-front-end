import axiosService from "../../utils/axiosService";

const fetchAllNote = (url) => {
    return axiosService.get(url);
}

const fetchAllFolder = (url) => {
    return axiosService.get(url);
}

const createFolder = (url, body) => {
    return axiosService.post(url, body);
}

export {
    fetchAllNote,
    fetchAllFolder,
    createFolder,
}