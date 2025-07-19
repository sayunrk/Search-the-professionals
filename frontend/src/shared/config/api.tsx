
import axiosInstance from "./axiosInstance";

export const login = (data: { username: string, password: string}) =>{
    return axiosInstance.post('/auth/login', data)
};

export const register = (data: { username: string, password: string}) =>{
    return axiosInstance.post('/auth/register', data)
};