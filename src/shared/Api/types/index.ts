export interface User {
   id: number;
   name: string;
}

export interface LoginResponse extends User {
   isAuthenticated: boolean;
}

export interface ConversationDetails {
   id: number | null;
   conversationId: number | null;
   is_owner: number;
   userid: number;
   status: number | null;
   lastseen: string | null;
   name: string | null;
   type: number | null;
}

export interface ConversationUser {
   id: number;
   conversationId: number;
   is_owner: number;
   userid: number;
   status: number | null;
   lastseen: string | null;
}

export interface Conversation {
   conversation: ConversationDetails;
   users: ConversationUser[];
}

export interface Message {
   id: number;
   senderId: number;
   message: string;
   timestamp: string;
   conversationid: number;
   status: number | null;
}

export type NewMessagesResponse = Message[] | { message: string };

export interface ApiPostResponse {
   id: number;
}

export const TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss'