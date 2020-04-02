import axiosService from '../../utils/axiosService';

const createNewAsk = (url, body) => {
    return axiosService.post(url, body);
}

export {
    createNewAsk,
}