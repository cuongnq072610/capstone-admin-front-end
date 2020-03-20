import axiosService from "../../utils/axiosService";

const fetchAsks = (url) => {
    return axiosService.get(url);
}

export {
    fetchAsks,
}