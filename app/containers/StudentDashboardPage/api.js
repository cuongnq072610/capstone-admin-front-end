import axiosService from '../../utils/axiosService';

const fetchUserInfo = (url) => {
    return axiosService.get(url);
}

const fetchUserStatistic = (url) => {
    return axiosService.get(url);
}

export {
    fetchUserInfo,
    fetchUserStatistic,
}