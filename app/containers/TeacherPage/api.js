import axiosService from '../../utils/axiosService';

const fetchTeacher = (url) => {
    return axiosService.get(url)
}

const updateTeacherApi = (url, body) => {
    return axiosService.put(url, body)
}

const fetchDepartment = (url) => {
    return axiosService.get(url);
}

export {
    fetchTeacher,
    updateTeacherApi,
    fetchDepartment,
}