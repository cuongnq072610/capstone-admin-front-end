import axiosService from '../../utils/axiosService';

const fetchHighlight = (url) => {
  return axiosService.get(url)
}

export {
    fetchHighlight
}