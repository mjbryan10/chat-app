import axios, { AxiosResponse } from 'axios';
import BaseApi from './BaseApi';
import { User, LoginResponse } from './@types';

export default class UserApi extends BaseApi {
   fetchById = async (id: number): Promise<AxiosResponse<User | false>> => {
      return await axios.get(`${this.baseUrl}/user/${id}`);
   };
   authenticateUser = async (id: number, name: string): Promise<LoginResponse> => {
      let response = await this.fetchById(id);
      if (response.data !== false && response.data.name === name) {
         return {
            id: response.data.id,
            name: response.data.name,
            isAuthenticated: true,
         };
      }
      return { id, name, isAuthenticated: false };
   };
   fetchAll = async (): Promise<AxiosResponse<User[]>> => {
      return await axios.get(`${this.baseUrl}/users`);
   };
}
