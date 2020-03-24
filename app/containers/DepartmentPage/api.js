import axiosService from '../../utils/axiosService';

const fetchDepartment = (url) => {
  return axiosService.get(url);
}

const createNewDepartment = (url, body) => {
    return axiosService.post(url, body);
}

export {
    fetchDepartment,
    createNewDepartment,
}