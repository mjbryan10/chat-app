import BaseApi from './BaseApi';
import axios, { AxiosResponse } from 'axios';
import { Conversation, ApiPostResponse } from './types';

export default class ConversationApi extends BaseApi {
   async fetchConversationsByUserId(
      userId: number
   ): Promise<AxiosResponse<Conversation[]>> {
      const response = await axios
         .get(`${this.baseUrl}conversation/user/${userId}`)
         .catch((error) => {
            throw error;
         });
      return response;
   }

   async createNewPersonalConversation(
      users: number[]
   ): Promise<AxiosResponse<ApiPostResponse>> {
      const response = await axios
         .post(`${this.baseUrl}conversation/personal`, {
            users: users.toString(),
         })
         .catch((error) => {
            throw error;
         });

      return response;
   }

   async createNewGroupConversation(
      users: number[],
      name: string
      ) {
         console.log('users: ', users, 'name: ', name);

      const response = await axios
         .post(`${this.baseUrl}conversation/group`, {
            users: users.toString(),
            name,
         })
         .catch((error) => {
            throw error;
         });
      
      return response;
   }
}
