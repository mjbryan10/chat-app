import axios, { AxiosResponse } from "axios";
import BaseApi from "./BaseApi";
import { Message, ApiPostResponse, NewMessagesResponse } from "./@types";

export default class MessageApi extends BaseApi {
  async fetchLimitedMessages(
    conversationId: number,
    limit: number,
    offset: number
 ): Promise<AxiosResponse<Message[]>> {
    const response = await axios
       .get(
          `${this.baseUrl}conversation/${conversationId}/message/limited?limit=${limit}&offset=${offset}`
       )
       .catch((error) => {
          throw error;
       });
    return response;
 }

 async fetchNewMessages(
    conversationId: number,
    lastMessageId: number
 ): Promise<AxiosResponse<NewMessagesResponse>> {
    const response = await axios
       .get(`${this.baseUrl}conversation/${conversationId}/new/${lastMessageId}`)
       .catch((error) => {
          throw error;
       });

    return response;
 }

 async postMessage(
    conversationId: number,
    senderId: number,
    message: string
 ): Promise<AxiosResponse<ApiPostResponse>> {
    const response = await axios
       .post(`${this.baseUrl}conversation/${conversationId}/message/send`, {
          message,
          senderId,
       })
       .catch((error) => {
          throw error;
       });

    return response;
 }
}