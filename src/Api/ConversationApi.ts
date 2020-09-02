import BaseApi from './BaseApi';
import axios, { AxiosResponse } from 'axios';
import { Conversation, ApiPostResponse } from './@types';

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
            users,
         })
         .catch((error) => {
            throw error;
         });

      return response;
   }

   async createNewGroupConversation(
      users: number[],
      name: string
   ): Promise<AxiosResponse<ApiPostResponse>> {
      const response = await axios
         .post(`${this.baseUrl}conversation/group`, {
            users,
            name,
         })
         .catch((error) => {
            throw error;
         });

      return response;
   }
}
