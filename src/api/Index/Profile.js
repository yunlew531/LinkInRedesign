import userReq from '../userReq';

export const getUser = (id) => userReq.get(`/user/${id}`);