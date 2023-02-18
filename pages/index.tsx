import styled from "styled-components";
import Sidebar from "../components/Sidebar";

import ProductLayout from "../components/ProductLayout";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Sidebar />
        <ProductLayout />
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 0 20px;
`;
