import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import ProductLayout from "../components/ProductLayout";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Container>
        <Sidebar />
        <ProductLayout />
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  padding: 20px;
`;
