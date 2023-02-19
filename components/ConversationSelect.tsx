import { useRouter } from "next/router";
import styled from "styled-components";
import { useRecipient } from "../hooks/useRecipient";
import { Conversation } from "../types";
import RecipientAvatar from "./RecipientAvatar";

interface IConversationProps {
  id: string;
  conversationUsers: Conversation["users"];
}

const ConversationSelect = ({ id, conversationUsers }: IConversationProps) => {
  const router = useRouter();

  const onSelectConversation = () => {
    router.push(`/conversations/${id}`);
  };

  const { recipientEmail, recipient } = useRecipient(conversationUsers);
  return (
    <Container onClick={onSelectConversation}>
      <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
      <span>{recipientEmail}</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-all;
  :hover {
    background-color: #e9eaeb;
  }
`;

export default ConversationSelect;
