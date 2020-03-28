import axiosService from '../../utils/axiosService';

const fetchAdminStatistic = (url) => {
    return axiosService.get(url);
}

export {
    fetchAdminStatistic,
}