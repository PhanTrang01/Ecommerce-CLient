import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";

import ChatIcon from "@mui/icons-material/Chat";
import MoreVerticalIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { db } from "../config/firebase";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useContext, useLayoutEffect, useState } from "react";
import * as EmailValidator from "email-validator";
import { addDoc, collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Conversation } from "../types";
import ConversationSelect from "./ConversationSelect";
import { UserContext } from "../contexts/UserContext";

const ChatSidebar = () => {
  const { user } = useContext(UserContext);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [email, setEmail] = useState("");

  const toggleDialog = (isOpen: boolean) => {
    setIsOpenDialog(isOpen);
    if (!isOpen) {
      setEmail("");
    }
  };

  const closeDialog = () => {
    toggleDialog(false);
  };

  // check existing conversation
  const queryConversationForCurrentUser = query(
    collection(db, "conversations"),
    where("users", "array-contains", user?.email)
  );
  const [conversationSnapshot] = useCollection(queryConversationForCurrentUser);
  const isExistingConversation = (emailInvited: string) => {
    return conversationSnapshot?.docs.find((conversation) =>
      (conversation.data() as Conversation).users.includes(emailInvited)
    );
  };
  const inviteSeft = email === user?.email;
  const createConversation = async () => {
    if (!email) return;
    if (
      EmailValidator.validate(email) &&
      !inviteSeft &&
      !isExistingConversation(email)
    ) {
      // add conversation to 'conversation' collection
      await addDoc(collection(db, "conversations"), {
        users: [user?.email, email],
      });
    }
    closeDialog();
  };

  const logout = async () => {
    try {
      // await signOut(auth);
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <StyleContainer>
      <StyleHeader>
        <Tooltip title={user?.email ?? "USER EMAIL"} placement="right">
          <StyleUserAvatar src={user?.photoURL || ""} />
        </Tooltip>
        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVerticalIcon />
          </IconButton>
          <IconButton onClick={logout}>
            <LogoutIcon />
          </IconButton>
        </div>
      </StyleHeader>
      <StyleSearch>
        <SearchIcon />
        <StyleSearchInput placeholder="Tìm kiếm trong cuộc hội thoại" />
      </StyleSearch>
      <StyleSidebarButton
        onClick={() => {
          toggleDialog(true);
        }}
      >
        Bắt đầu cuộc hội thoại mới
      </StyleSidebarButton>
      {/* list of conversations */}
      {conversationSnapshot?.docs.map((conversation) => (
        <ConversationSelect
          key={conversation.id}
          id={conversation.id}
          conversationUsers={(conversation.data() as Conversation).users}
        />
      ))}

      <Dialog open={isOpenDialog} onClose={closeDialog}>
        <DialogTitle>Cuộc hội thoại mới</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập địa chỉ email của người dùng bạn muốn trò chuyện
          </DialogContentText>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Hủy</Button>
          <Button disabled={!email} onClick={createConversation}>
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </StyleContainer>
  );
};

const StyleContainer = styled.div`
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  border-right: 1px solid whitesmoke;
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const StyleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border: 1px solid whitesmoke;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
`;

const StyleSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 2px;
`;

const StyleSidebarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;

const StyleUserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const StyleSearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
  padding: 0 10px;
`;

export default ChatSidebar;
