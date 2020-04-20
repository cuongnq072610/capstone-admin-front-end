import axiosService from '../../utils/axiosService';

const fetchFaqData = (url) => {
    return axiosService.get(url);
}

export {
    fetchFaqData,
}