import Image from "next/image";
import StarRateIcon from "@mui/icons-material/StarRate";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "styled-components";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import { Product } from "../types";
import axios from "axios";

const ProductLayout = () => {
  const [productsData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const server_host = "http://localhost:8000/api";
        const res = await axios.get(`${server_host}/products`);
        const newProductsData = res.data;
        if (newProductsData.data.length > 0) {
          setProductData(newProductsData.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductData();
  }, []);

  return (
    <ProductLayoutSection>
      <h2>Featured Products</h2>
      <p>New Morden Design</p>
      <ProductContainer>
        {productsData.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductItem>
              <ProductImage>
                <Image
                  src={product.photoURL}
                  alt="product image"
                  width={222}
                  height={300}
                />
              </ProductImage>
              <ProductDescription>
                <h5>{product.pname}</h5>
                <span>{product.description}</span>
                <ProductStar>
                  <span>
                    <StarRateIcon />
                  </span>
                  <span>
                    <StarRateIcon />
                  </span>
                  <span>
                    <StarRateIcon />
                  </span>
                  <span>
                    <StarRateIcon />
                  </span>
                </ProductStar>
                <ProductInfo>
                  <h4>${product.price}</h4>
                  <Chip label={`${product.quantity} available`} size="small" />
                </ProductInfo>
                <CartButton>
                  <AddShoppingCartIcon />
                </CartButton>
              </ProductDescription>
            </ProductItem>
          </Link>
        ))}
      </ProductContainer>
    </ProductLayoutSection>
  );
};

const ProductLayoutSection = styled.div`
  text-align: center;
  padding: 0 40px;
  margin-bottom: 40px;
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

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto;
  grid-gap: 32px 28px;
`;

const ProductItem = styled.div`
  position: relative;
  width: 25%;
  height: 100%;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  padding: 10px 12px;
  border: 1px solid #cce7d0;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 16px 16px 30px rgba(0, 0, 0, 0.02);
  margin: 15px 0;
  transition: all 0.2s ease;
  :hover {
    transform: translateY(-10px);
    box-shadow: 16px 16px 30px rgba(0, 0, 0, 0.4);
  }
`;

const ProductImage = styled.div`
  flex-shrink: 0;
  img {
    object-fit: cover;
    border-radius: 20px;
  }
`;

const ProductDescription = styled.div`
  flex: 1;
  text-align: start;
  padding: 10px 0;
  span {
    color: #606063;
    font-size: 12px;
  }
  h5 {
    padding-top: 7px;
    color: #1a1a1a;
    font-size: 14px;
  }
`;

const ProductStar = styled.div`
  span {
    color: rgb(240, 225, 18);
  }
  margin-bottom: 16px;
`;

const ProductInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 10px;
  h4 {
    padding-left: 7px;
    padding-bottom: 4px;
    font-size: 15px;
    font-weight: 700;
    color: #088178;
  }
`;

const CartButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 10px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50px;
  background-color: #e8f6ea;
  font-weight: 500;
  color: #088178;
  border: 1px solid #cce7d0;
  padding: 8px 0;
`;

export default ProductLayout;
