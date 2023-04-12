import {
  collection,
  DocumentData,
  orderBy,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Message } from "../types";

export const generateQueryGetMessages = (conversationId?: string) =>
  query(
    collection(db, "messages"),
    where("conversation_id", "==", conversationId),
    orderBy("sent_at", "asc")
  );

export const transformMessage = (
  message: QueryDocumentSnapshot<DocumentData>
) =>
  ({
    id: message.id,
    ...message.data(),
    sent_at: message.data().sent_at
      ? convertTimestampToString(message.data().sent_at as Timestamp)
      : null,
  } as Message);

export const convertTimestampToString = (timestamp: Timestamp): string =>
  new Date(timestamp.toDate().getTime()).toLocaleString();
