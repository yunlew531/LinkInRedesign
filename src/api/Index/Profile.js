import authReq from '../auth_req';

export const getProfile = () => authReq.get('/self/profile');
export const getPhoto = () => authReq.get('/self/photo');
export const uploadPhoto = (formData) => authReq.post('/self/photo', formData);
export const uploadBackgroundImg = (formData) => authReq.post('/self/background', formData);
export const updateDescription = (description) => authReq.put('/self/description/update', { description });
export const updateAbout = (about) => authReq.put('/self/about/update', { about });