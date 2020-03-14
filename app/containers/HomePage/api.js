import axiosService from '../../utils/axiosService';

const fetchCourse = (url) => {
  return axiosService.get(url)
}

export {
    fetchCourse
}