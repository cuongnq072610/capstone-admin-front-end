import axiosService from '../../utils/axiosService';

const fetchAskDetail = (url) => {
    return axiosService.get(url);
}

const closeAskDetail = (url) => {
    return axiosService.putWithoutBody(url);
}

export {
    fetchAskDetail,
    closeAskDetail,
}