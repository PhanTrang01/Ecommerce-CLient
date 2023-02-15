import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Product } from "../../types";
import axios from "axios";
import StarRateIcon from "@mui/icons-material/StarRate";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";

const ProductDetail = () => {
  const route = useRouter();
  const id = route.query.id;

  const [productData, setProductData] = useState<Product | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const server_host = "http://localhost:8000/api";
        const res = await axios.get(`${server_host}/products/${id}`);
        const newProductData = res.data.data;
        if (newProductData) setProductData(newProductData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <ProductDetailContainer>
      <CardWrapper>
        <CardIntro>
          <h1>Product Detail</h1>
          <h2>New Morden Design</h2>
        </CardIntro>
        <Card>
          <ProductImg>
            <Image
              src={
                productData?.photoURL
                  ? productData.photoURL
                  : "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/product.png"
              }
              alt="product image"
              width="400"
              height="400"
            />
          </ProductImg>
          <ProductContent>
            <ProductTitle>{productData?.pname}</ProductTitle>
            <ProductLink>visit nike store</ProductLink>
            <ProductRating>
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
              <span>
                <StarRateIcon />
              </span>
            </ProductRating>

            <ProductPrice>
              <p className="last-price">
                Price: <span>${productData?.price}</span>
              </p>
            </ProductPrice>

            <ProductDetailText>
              <h2>about this item: </h2>
              <p>{productData?.description}</p>
              <ul>
                <li>
                  Available: <span>{productData?.quantity}</span>
                </li>
                <li>
                  Category: <span>{productData?.category.name}</span>
                </li>
                <li>
                  Shipping Area: <span>All over the world</span>
                </li>
                <li>
                  Shipping Fee: <span>Free</span>
                </li>
              </ul>
            </ProductDetailText>

            <PurchaseInfo>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <Button color="primary" variant="contained">
                Add to Cart <AddShoppingCartIcon />
              </Button>
            </PurchaseInfo>
          </ProductContent>
        </Card>
      </CardWrapper>
      <hr />
    </ProductDetailContainer>
  );
};

const ProductDetailContainer = styled.div``;

const CardWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const CardIntro = styled.div`
  text-align: center;
  margin-top: 40px;
  h2 {
    font-weight: 300;
    font-size: 16px;
    color: #888;
  }
`;

const Card = styled.div`
  display: flex;
`;

const ProductImg = styled.div`
  padding: 2.8rem 0;
  img {
    object-fit: cover;
  }
`;

const ProductContent = styled.div`
  padding: 2rem 1rem;
`;

const ProductTitle = styled.h2`
  font-size: 3rem;
  text-transform: capitalize;
  font-weight: 700;
  position: relative;
  color: #12263a;
  margin: 1rem 0;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    width: 80px;
    background: #12263a;
  }
`;

const ProductLink = styled.a`
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 0.5rem;
  background: #256eff;
  color: #fff;
  padding: 0 0.3rem;
  transition: all 0.5s ease;
  &:hover {
    opacity: 0.9;
  }
`;

const ProductRating = styled.div`
  color: #ffc107;
`;

const ProductPrice = styled.div`
  margin: 1rem 0;
  font-size: 1rem;
  font-weight: 700;
  span {
    font-weight: 400;
  }
`;

const ProductDetailText = styled.div`
  h2 {
    text-transform: capitalize;
    color: #12263a;
    padding-bottom: 0.6rem;
  }
  p {
    font-size: 0.9rem;
    padding: 0.3rem;
    opacity: 0.8;
  }
  ul {
    margin: 1rem 0;
    font-size: 0.9rem;
    li {
      margin: 0;
      list-style: none;
      background: url(https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/checked.png)
        left center no-repeat;
      background-size: 18px;
      padding-left: 1.7rem;
      margin: 0.4rem 0;
      font-weight: 600;
      opacity: 0.9;
      span {
        font-weight: 400;
      }
    }
  }
`;

const PurchaseInfo = styled.div`
  margin: 1.5rem 0;
  input {
    border: 1.5px solid #ddd;
    border-radius: 25px;
    text-align: center;
    padding: 0.45rem 0.8rem;
    outline: 0;
    margin-right: 1rem;
    margin-bottom: 1rem;
    width: 60px;
  }
`;

export default ProductDetail;
