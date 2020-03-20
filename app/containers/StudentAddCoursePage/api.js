import axiosService from '../../utils/axiosService';

const fetchCourse = (url) => {
  return axiosService.get(url);
}

const updateCourse = (url, body) => {
  return axiosService.put(url, body);
}

export {
    fetchCourse,
    updateCourse,
}