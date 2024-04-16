import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchUser = () => API.get('/user');
export const loginUser = (userData) => API.post('/user/login', userData);
