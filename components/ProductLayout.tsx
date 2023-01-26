import Image from "next/image";
import StarRateIcon from "@mui/icons-material/StarRate";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "styled-components";
import Link from "next/link";

const ProductLayout = () => {
  const productsData = [
    {
      id: 1,
      name: "Product 1",
      description: "Product description",
      quantity: 1,
      price: 100,
      productImage:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/qqEwMDfT2BixRguU3MSLGzbxnHFkqB0UWOUNNEdg.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Product description",
      quantity: 1,
      price: 100,
      productImage:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/qqEwMDfT2BixRguU3MSLGzbxnHFkqB0UWOUNNEdg.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Product description",
      quantity: 1,
      price: 100,
      productImage:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/qqEwMDfT2BixRguU3MSLGzbxnHFkqB0UWOUNNEdg.jpg",
    },
    {
      id: 4,
      name: "Product 4",
      description: "Product description",
      quantity: 1,
      price: 100,
      productImage:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/qqEwMDfT2BixRguU3MSLGzbxnHFkqB0UWOUNNEdg.jpg",
    },
    {
      id: 5,
      name: "Product 5",
      description: "Product description",
      quantity: 1,
      price: 100,
      productImage:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/qqEwMDfT2BixRguU3MSLGzbxnHFkqB0UWOUNNEdg.jpg",
    },
    {
      id: 6,
      name: "Product 6",
      description: "Product description",
      quantity: 1,
      price: 100,
      productImage:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/qqEwMDfT2BixRguU3MSLGzbxnHFkqB0UWOUNNEdg.jpg",
    },
    {
      id: 7,
      name: "Product 7",
      description: "Product description",
      quantity: 1,
      price: 100,
      productImage:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/qqEwMDfT2BixRguU3MSLGzbxnHFkqB0UWOUNNEdg.jpg",
    },
    {
      id: 8,
      name: "Product 8",
      description: "Product description",
      quantity: 1,
      price: 100,
      productImage:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/qqEwMDfT2BixRguU3MSLGzbxnHFkqB0UWOUNNEdg.jpg",
    },
  ];
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
                  src={product.productImage}
                  alt="product image"
                  width={222}
                  height={300}
                />
              </ProductImage>
              <ProductDescription>
                <span>{product.description}</span>
                <h5>{product.name}</h5>
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
                <h4>${product.price}</h4>
              </ProductDescription>
              <CartButton>
                <AddShoppingCartIcon />
              </CartButton>
            </ProductItem>
          </Link>
        ))}
      </ProductContainer>
    </ProductLayoutSection>
  );
};

const ProductLayoutSection = styled.div`
  text-align: center;
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 28px;
`;

const ProductItem = styled.div`
  position: relative;
  width: 23%;
  min-width: 250px;
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
  img {
    object-fit: cover;
    border-radius: 20px;
  }
`;

const ProductDescription = styled.div`
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
  h4 {
    padding-top: 7px;
    font-size: 15px;
    font-weight: 700;
    color: #088178;
  }
`;

const ProductStar = styled.div`
  span {
    color: rgb(240, 225, 18);
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
