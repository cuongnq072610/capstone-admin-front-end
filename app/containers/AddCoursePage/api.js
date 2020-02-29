import axiosService from '../../utils/axiosService';

const addCourseApi = (url, body) => {
    return axiosService.post(url, body);
}

const updateCourseApi = (url, body) => {
    return axiosService.put(url, body);
}

export {
    addCourseApi,
    updateCourseApi,
}