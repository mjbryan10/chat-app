import axios, { AxiosResponse } from 'axios';
import BaseApi from './BaseApi';
import { User, LoginResponse } from './@types';

export default class UserApi extends BaseApi {
   /**
    * Returns a promise.
    *
    * Attempts to fetch a user from the API by its user.
    * @param id The id of the desired user
    * @returns The user or false if unable to find.
    */
   fetchById = async (id: number): Promise<AxiosResponse<User | false>> => {
      return await axios.get(`${this.baseUrl}/user/${id}`).catch((error) => {
         throw error;
      });
   };
   /**
    * Fetches a users name by the given ID.
    *
    * If unable to fetch the user or connect to the API, will throw relevant error.
    * @param id The id of the user for which you wish to find the name
    */
   fetchUserNameById = async (id: number): Promise<string> => {
      return await this.fetchById(id)
         .then(({ data }) => {
            if (data === false) return 'Anonymous';
            //it is possible on API to message from a user that doesn't exist
            //these can be identified as Anonymous users.
            if (!data) throw new Error('User was not found');
            return data.name;
         })
         .catch(() => {
            throw new Error('Unable to fetch users at this time');
         });
   };
   /**
    * Attempts to verify a user by matching the name to the name of a user by
    * the same id in the database.
    * @param id The ID of the user
    * @param name The Name of the user
    */
   authenticateUser = async (id: number, name: string): Promise<LoginResponse> => {
      const response = await this.fetchById(id).catch((error) => {
         throw error;
      });
      if (response.data !== false && response.data.name === name) {
         return {
            id: response.data.id,
            name: response.data.name,
            isAuthenticated: true,
         };
      }
      return { id, name, isAuthenticated: false };
   };
   /**
    * Fetches all users from the database.
    */
   fetchAll = async (): Promise<User[]> => {
      return await axios
         .get(`${this.baseUrl}/users`)
         .then((response) => response.data)
         .catch((error) => {
            throw error;
         });
   };
}
