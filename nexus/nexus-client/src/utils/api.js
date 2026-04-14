import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure your backend is running here
});

// Automatically attach the token to all requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;