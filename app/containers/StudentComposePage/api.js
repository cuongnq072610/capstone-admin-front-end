import axiosService from '../../utils/axiosService';

const fetchAskDetail = (url) => {
    return axiosService.get(url);
}

const updateAskDetail = (url) => {
    return axiosService.putWithoutBody(url);
}

export {
    fetchAskDetail,
    updateAskDetail,
}