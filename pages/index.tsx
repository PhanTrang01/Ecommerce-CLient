import styled from "styled-components";
import Sidebar from "../components/Sidebar";

import ProductLayout from "../components/ProductLayout";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";

export default function Home({
  productsData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [products, setProducts] = useState(productsData);
  return (
    <>
      <Header />
      <Container>
        <Sidebar
          productsData={productsData}
          setProductsCallback={setProducts}
        />
        <ProductLayoutSection>
          <h2>Featured Products</h2>
          <p>New Morden Design</p>
          <ProductLayout productsData={products} />
        </ProductLayoutSection>
      </Container>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const server_host = "http://localhost:8000/api";
  try {
    const res = await axios.get(`${server_host}/products`);
    const newProductsData = res.data;
    return {
      props: {
        productsData: newProductsData.data,
      },
    };
  } catch (error) {
    return {
      props: {
        productsData: [],
      },
    };
  }
};

const Container = styled.div`
  padding: 0 20px;
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
