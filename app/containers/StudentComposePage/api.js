import axiosService from '../../utils/axiosService';

const fetchAskDetail = (url) => {
    return axiosService.get(url);
}

const closeAskDetail = (url) => {
    return axiosService.put(url);
}

export {
    fetchAskDetail,
    closeAskDetail,
}