import axios from 'axios';

const authReq = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});

export default authReq;