import axiosService from '../../utils/axiosService';

const getTeacherStatistic = (url) => {
    return axiosService.get(url);
}

export {
    getTeacherStatistic,
}