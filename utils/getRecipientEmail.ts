import { Conversation, User } from "../types";

export const getRecipientEmail = (
  conversationUsers: Conversation["users"],
  loggedInUser: User | undefined
) => conversationUsers.find((userEmail) => userEmail !== loggedInUser?.email);
