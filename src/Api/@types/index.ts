export interface User {
  id: number;
  name: string;
}

export interface LoginResponse extends User {
  isAuthenticated: boolean;
}

export interface ConversationDetails {
id: number | null,
conversationId: number | null
is_owner: number;
userId: number;
status: number | null;
lastseen: string;
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

export interface ApiPostResponse {
  id: number;
}