import { Timestamp } from "firebase/firestore";

export type User = {
  name: string;
  email: string;
  photoURL: string;
};

export type Conversation = {
  users: string[];
};

export type UserInConversation = {
  email: string;
  lastSeen: Timestamp;
  photoURL: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  sent_at: string;
  text: string;
  user: string;
};
