import axios from 'axios';

let url = 'http://localhost:8000';

const api = axios.create({
    baseURL: url,
});

export default api;
