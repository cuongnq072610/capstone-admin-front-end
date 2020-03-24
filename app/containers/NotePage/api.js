import axiosService from "../../utils/axiosService";

const fetchRecentNote = (url) => {
    return axiosService.get(url);
}

const deleteNote = (url) => {
    return axiosService.delete(url);
}
const fetchStudentCourses = (url) => {
    return axiosService.get(url);
}

export {
    fetchRecentNote,
    deleteNote,
    fetchStudentCourses,
}