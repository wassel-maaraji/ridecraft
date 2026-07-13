import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6a54f8cbe49d9eb2cc55649c.mockapi.io',
});

export default api;