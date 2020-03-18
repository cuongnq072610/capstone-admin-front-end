import axiosService from '../../utils/axiosService';

const fetchUserInfo = (url) => {
    return axiosService.get(url);
}

export {
    fetchUserInfo,
}