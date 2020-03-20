import axiosService from '../../utils/axiosService';

const fetchHighlightByFolder = (url) => {
    return axiosService.get(url);
}

const deleteHighlight = (url) => {
    return axiosService.delete(url);
}

export {
    fetchHighlightByFolder,
    deleteHighlight,
}