import IconButton from "@mui/material/IconButton";
import styled from "styled-components";
import { useRecipient } from "../hooks/useRecipient";
import { Conversation, Message as TMessage } from "../types";
import {
  convertTimestampToString,
  generateQueryGetMessages,
  transformMessage,
} from "../utils/getMessagesInConversation";
import RecipientAvatar from "./RecipientAvatar";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import {
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
  useRef,
  useState,
} from "react";
import {
  serverTimestamp,
  setDoc,
  doc,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { UserContext } from "../contexts/UserContext";

interface IConversationScreenProps {
  conversation: Conversation;
  messages: TMessage[];
}

const ConversationScreen = ({
  conversation,
  messages,
}: IConversationScreenProps) => {
  const { user } = useContext(UserContext);
  const conversationUser = conversation.users;
  const { recipient, recipientEmail } = useRecipient(conversationUser);

  // state
  const [newMessage, setNewMessage] = useState("");
  // ref
  const endOfRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    endOfRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const router = useRouter();
  const conversationId = router.query.id;
  const queryGetMessages = generateQueryGetMessages(conversationId as string);
  const [messagesSnapshot, messagesLoading, __error] =
    useCollection(queryGetMessages);
  const showMessages = () => {
    // loading frontend => get messages from next SSR
    if (messagesLoading) {
      return messages.map((message) => (
        <Message key={message.id} message={message} />
      ));
    }
    // frontend finished loading messages
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message key={message.id} message={transformMessage(message)} />
      ));
    }
    return null;
  };

  const addMessageToDbAndUpdateLastSeen = async () => {
    // update last seen
    await setDoc(
      doc(db, "users", user?.email as string),
      {
        lastSeen: serverTimestamp(),
      },
      {
        merge: true,
      }
    );

    // add new message
    await addDoc(collection(db, "messages"), {
      conversation_id: conversationId,
      sent_at: serverTimestamp(),
      text: newMessage,
      user: user?.email,
    });

    setNewMessage("");
    scrollToBottom();
  };

  const sendMessageOnEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!newMessage) return;
      addMessageToDbAndUpdateLastSeen();
    }
  };
  const senMessageOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!newMessage) return;
    addMessageToDbAndUpdateLastSeen();
  };
  return (
    <>
      <StyleRecipientHeader>
        <RecipientAvatar
          recipient={recipient}
          recipientEmail={recipientEmail}
        />
        <StyleHeaderInfo>
          <StyleH3>{recipientEmail}</StyleH3>
          {recipient && (
            <span>
              Hoạt động lần cuối: {convertTimestampToString(recipient.lastSeen)}
            </span>
          )}
        </StyleHeaderInfo>
        <StyleHeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </StyleHeaderIcons>
      </StyleRecipientHeader>
      <StyleMessageContainer>
        {showMessages()}
        <EndOfMessageForAutoScroll ref={endOfRef}></EndOfMessageForAutoScroll>
      </StyleMessageContainer>
      <StyleInputContainer>
        <InsertEmoticonIcon />
        <StyleInput
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={sendMessageOnEnter}
        ></StyleInput>
        <IconButton onClick={senMessageOnClick} disabled={!newMessage}>
          <SendIcon />
        </IconButton>
        <IconButton>
          <MicIcon />
        </IconButton>
      </StyleInputContainer>
    </>
  );
};

const StyleRecipientHeader = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  padding: 10px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const StyleHeaderInfo = styled.div`
  flex-grow: 1;
  > h3 {
    margin-top: 0;
    margin-bottom: 3px;
  }
  > span {
    font-size: 14px;
    color: #888;
  }
`;

const StyleH3 = styled.h3`
  word-break: break-all;
`;

const StyleHeaderIcons = styled.div`
  display: flex;
`;

const StyleMessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const StyleInputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  z-index: 100;
`;

const StyleInput = styled.input`
  flex: 1;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 10px;
  margin: 0 15px;
  font-size: 16px;
`;

const EndOfMessageForAutoScroll = styled.div`
  margin-bottom: 10px;
`;

export default ConversationScreen;
