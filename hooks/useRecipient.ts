import { useContext } from "react";
import { collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { UserInConversation, Conversation } from "../types";
import { getRecipientEmail } from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { UserContext } from "../contexts/UserContext";

export const useRecipient = (conversationUsers: Conversation["users"]) => {
  const { user } = useContext(UserContext);
  // get recipient email
  const recipientEmail = getRecipientEmail(conversationUsers, user);
  // get recipient avatar
  const queryRecipient = query(
    collection(db, "users"),
    where("email", "==", recipientEmail)
  );

  const [recipientSnapshot] = useCollection(queryRecipient);
  // check recipientSnapshot => empty array or array of 1 element
  const recipient = recipientSnapshot?.docs[0]?.data() as
    | UserInConversation
    | undefined;

  return { recipientEmail, recipient };
};
