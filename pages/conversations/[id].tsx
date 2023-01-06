import { doc, getDoc, getDocs } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import ConversationScreen from "../../components/ConversationScreen";
import ChatSidebar from "../../components/ChatSidebar";
import { db } from "../../config/firebase";
import { Conversation, Message } from "../../types";
import {
  generateQueryGetMessages,
  transformMessage,
} from "../../utils/getMessagesInConversation";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

interface Props {
  conversation: Conversation;
  messages: Message[];
}

const StyleContainer = styled.div`
  display: flex;
`;

const StyleConversationContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Conversation = ({ conversation, messages }: Props) => {
  return (
    <StyleContainer>
      <Head>
        <title>Conversation with {conversation.users}</title>
      </Head>
      <ChatSidebar />
      <StyleConversationContainer>
        <ConversationScreen conversation={conversation} messages={messages} />
      </StyleConversationContainer>
    </StyleContainer>
  );
};

export default Conversation;

// serverside
export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async (context) => {
  const conversationId = context.params?.id;

  // get anybody chatting
  const conversationRef = doc(db, "conversations", conversationId as string);
  const conversationSnapshot = await getDoc(conversationRef);

  // get all message between 2 body
  const queryMessages = generateQueryGetMessages(conversationId);

  const messagesSnapshot = await getDocs(queryMessages);
  const messages = messagesSnapshot.docs.map((messageDoc) =>
    transformMessage(messageDoc)
  );

  return {
    props: {
      conversation: conversationSnapshot.data() as Conversation,
      messages,
    },
  };
};
