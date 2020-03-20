import axiosService from '../../utils/axiosService';

const fetchHighlight = (url) => {
  return axiosService.get(url)
}

const fetchStudentCourses = (url) => {
  return axiosService.get(url);
}

const deleteHighlight = (url) => {
  return axiosService.delete(url);
}

export {
    fetchHighlight,
    fetchStudentCourses,
    deleteHighlight,
}