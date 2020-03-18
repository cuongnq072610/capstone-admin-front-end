import axios from 'axios';

const token = JSON.parse(localStorage.getItem('user')).tokens[0].accessToken;
class AxiosService {
    constructor() {
        const instance = axios.create({
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        instance.interceptors.response.use(this.handleSuccess, this.handleError);
        this.instance = instance;
    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        return Promise.reject(error);
    }

    get(url) {
        return this.instance.get(url);
    }

    post(url, body) {
        return this.instance.post(url, body);
    }

    put(url, body) {
        return this.instance.put(url, body);
    }

    deleteWithBody(url, body) {
        return this.instance.delete(url, body);
    }

    delete(url) {
        return this.instance.delete(url);
    }
}

export default new AxiosService();