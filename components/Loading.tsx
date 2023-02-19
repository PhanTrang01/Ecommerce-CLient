import styled from "styled-components";
import Image from "next/image";
import WhatsAppLogo from "../assets/img/Whatsapp_logo.png";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image
          src={WhatsAppLogo}
          alt="Whatsapp Logo"
          height={200}
          width={200}
        />
      </ImageWrapper>

      <CircularProgress />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ImageWrapper = styled.div`
  margin-bottom: 50px;
`;

export default Loading;
