import axiosService from '../../utils/axiosService';

const fetchFaqData = (url) => {
    return axiosService.get(url);
}

const deleteFaq = url => {
    return axiosService.delete(url);
}

export {
    fetchFaqData,
    deleteFaq,
}