import axiosService from '../../utils/axiosService';

const fetchCourse = (url) => {
    return axiosService.get(url)
}

const fetchTeacher = (url) => {
    return axiosService.get(url)
}

const fetchReportData = (url) => {
    return axiosService.get(url);
}

export {
    fetchCourse,
    fetchTeacher,
    fetchReportData,
}