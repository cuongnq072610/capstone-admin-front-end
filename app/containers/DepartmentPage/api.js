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

const updateNewDepartment = (url, body) => {
  return axiosService.put(url, body);
}

export {
  fetchDepartment,
  createNewDepartment,
  deleteOldDepartment,
  updateNewDepartment,
}