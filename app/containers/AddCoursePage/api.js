import axiosService from '../../utils/axiosService';

const addCourseApi = (url, body) => {
    return axiosService.post(url, body);
}

const updateCourseApi = (url, body) => {
    return axiosService.put(url, body);
}

const fetchDepartment = (url) => {
    return axiosService.get(url);
  }

export {
    addCourseApi,
    updateCourseApi,
    fetchDepartment,
}