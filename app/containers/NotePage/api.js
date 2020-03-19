import axiosService from "../../utils/axiosService";

const fetchAllNote = (url) => {
    return axiosService.get(url);
}

const deleteNote = (url) => {
    return axiosService.delete(url);
}

export {
    fetchAllNote,
    deleteNote,
}