import axiosService from '../../utils/axiosService';

const createNewAsk = (url, body) => {
    return axiosService.post(url, body);
}

const fetchUserInfo = (url) => {
    return axiosService.get(url);
}

const fetchTeacher = (url) => {
    return axiosService.get(url)
}

export {
    createNewAsk,
    fetchUserInfo,
    fetchTeacher,
}