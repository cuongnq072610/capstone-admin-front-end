import axiosService from '../../utils/axiosService';

const fetchTeacher = (url) => {
    return axiosService.get(url)
}

export {
    fetchTeacher
}