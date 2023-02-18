import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import ProductLayout from "../components/ProductLayout";
import { InferGetStaticPropsType } from "next";
import axios from "axios";
import Footer from "../components/Footer";

export default function Home({
  productsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Container>
        <Sidebar />
        <ProductLayoutSection>
          <h2>Featured Products</h2>
          <p>New Morden Design</p>
          <ProductLayout productsData={productsData} />
        </ProductLayoutSection>
      </Container>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const server_host = "http://localhost:8000/api";
    const res = await axios.get(`${server_host}/products`);
    const newProductsData = res.data;
    return {
      props: {
        productsData: newProductsData.data,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

const Container = styled.div`
  padding: 20px;
`;

const ProductLayoutSection = styled.div`
  text-align: center;
  padding: 0 40px;
  margin-bottom: 40px;
  margin-top: 40px;
  h2 {
    margin: 20px 0;
    font-size: 28px;
  }
  p {
    color: #606063;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
