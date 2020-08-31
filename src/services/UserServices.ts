import axios from 'axios';
import Api from './Api';

export const fetchUserById = async (userId: number) => {
   return await axios.get(`${Api.baseUrl}/user/${userId}`);
};

export const fetchAllUsers = async () => {
   return await axios.get(`${Api.baseUrl}/users`);
};
