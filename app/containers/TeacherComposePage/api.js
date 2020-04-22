import axiosService from '../../utils/axiosService';

const fetchAskDetail = (url) => {
    return axiosService.get(url);
}

const closeAskDetail = (url) => {
    return axiosService.putWithoutBody(url);
}

const createFaq = (url, body) => {
    return axiosService.post(url, body);
}

export {
    fetchAskDetail,
    closeAskDetail,
    createFaq,
}