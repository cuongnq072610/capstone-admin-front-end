import axiosService from '../../utils/axiosService';

const fetchDepartment = (url) => {
  return axiosService.get(url);
}

const createNewDepartment = (url, body) => {
  return axiosService.post(url, body);
}

const deleteOldDepartment = (url) => {
  return axiosService.delete(url);
}

export {
  fetchDepartment,
  createNewDepartment,
  deleteOldDepartment,
}