import styled from "styled-components";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      <Container>
        <Sidebar />
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 20px;
`;
