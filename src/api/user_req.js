import axios from 'axios';

const userReq = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

export default userReq;