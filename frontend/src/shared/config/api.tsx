
import axiosInstance from "./axiosInstance";

export const login = (data: { username: string, password: string}) =>{
    return axiosInstance.post('/auth/login', data)
};

export const register = (data: { username: string, password: string}) =>{
    return axiosInstance.post('/auth/register', data)
};
export const getUserListApi = () => {
    return axiosInstance.get(`/user/list`);
};
export const searchUserApi = (username: string, role?: string) => {
    let query = `username=${username}`;
    if (role) {
        query += `&role=${role}`;
    }
    return axiosInstance.get(`/user/search?${query}`);
};