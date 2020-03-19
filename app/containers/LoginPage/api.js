import axiosService from '../../utils/axiosService';

const loginService = (url, body) => {
    return axiosService.post(url, body);
}

export {
    loginService,
}