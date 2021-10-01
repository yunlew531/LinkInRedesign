import authReq from '../auth_req';

export const getProfile = () => authReq.get('/self/profile');
