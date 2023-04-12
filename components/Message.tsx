import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styled from "styled-components";
import { Message } from "../types";

const Message = ({ message }: { message: Message }) => {
  const { user } = useContext(UserContext);
  const MessageType =
    user?.email === message.user ? StyleSenderMessage : StyleReciveMessage;
  return (
    <MessageType>
      {message.text}
      <StyleTimestamp>{message.sent_at}</StyleTimestamp>
    </MessageType>
  );
};

const StyleMessage = styled.p`
  width: fit-content;
  word-break: break-all;
  max-width: 90%;
  min-width: 30%;
  padding: 15px 15px 30px;
  border-radius: 8px;
  margin: 10px;
  position: relative;
`;

const StyleSenderMessage = styled(StyleMessage)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const StyleReciveMessage = styled(StyleMessage)`
  background-color: whitesmoke;
`;

const StyleTimestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: x-small;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
`;

export default Message;
