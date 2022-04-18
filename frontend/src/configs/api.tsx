import axios from 'axios';

let url = 'http://localhost:8000';

const api = axios.create({
    baseURL: url,
    withCredentials: true,
});

export default api;
