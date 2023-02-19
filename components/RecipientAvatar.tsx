import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import { useRecipient } from "../hooks/useRecipient";

type RecipientType = ReturnType<typeof useRecipient>;

const RecipientAvatar = ({ recipient, recipientEmail }: RecipientType) => {
  return recipient?.photoURL ? (
    <StyleAvatar src={recipient.photoURL}></StyleAvatar>
  ) : (
    <StyleAvatar>
      {recipientEmail && recipientEmail[0].toUpperCase()}
    </StyleAvatar>
  );
};

const StyleAvatar = styled(Avatar)`
  margin: 5px 15px 5px 5px;
`;

export default RecipientAvatar;
