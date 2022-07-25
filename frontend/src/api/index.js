import axios from 'axios';
let url = '';

if (process.env.NODE_ENV === 'production') {
  url = 'https://travelknights.herokuapp.com/api';
} else {
  url = 'http://localhost:5000/api';
}

export const fetchPosts = () => axios.get(url);
export const createUser = (user) => axios.post(`${url}/register`, user);
export const getUser = (user) => axios.post(`${url}/login`, user);
export const addMemory = (trip) => axios.post(`${url}/Map`, trip);