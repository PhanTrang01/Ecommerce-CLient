import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Sidebar />
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 0 20px;
`;
