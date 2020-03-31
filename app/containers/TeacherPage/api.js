import axiosService from '../../utils/axiosService';

const fetchTeacher = (url) => {
    return axiosService.get(url)
}

const fetchCourse = (url) => {
    return axiosService.get(url)
}

const updateTeacherApi = (url, body) => {
    return axiosService.put(url, body)
}

export {
    fetchTeacher,
    updateTeacherApi,
    fetchCourse,
}