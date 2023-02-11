import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import ProductLayout from "../components/ProductLayout";

export default function Home() {
  return (
    <Container>
      <Sidebar />
      <ProductLayout />
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
`;
