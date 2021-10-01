import userReq from '../user_req';

export const getUser = (id) => userReq.get(`/user/${id}`);