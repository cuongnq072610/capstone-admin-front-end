import axiosService from '../../utils/axiosService';

const fetchChooseRole = (url, body) => {
    return axiosService.post(url, body);
}

export {
    fetchChooseRole,
}