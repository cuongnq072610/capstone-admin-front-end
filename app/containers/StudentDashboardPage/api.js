import axiosService from '../../utils/axiosService';

const fetchUserInfo = (url) => {
    return axiosService.get(url);
}

const fetchUserStatistic = (url) => {
    return axiosService.get(url);
}

const fetchExitCourse = (url) => {
    return axiosService.putWithoutBody(url);
}

export {
    fetchUserInfo,
    fetchUserStatistic,
    fetchExitCourse,
}