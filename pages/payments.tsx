import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "@mui/material/Button";
import { CartContext } from "../contexts/CartContext";
import Image from "next/image";
import { Cart } from "../types";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { ToastContext } from "../contexts/ToastContext";

const Payments = () => {
  const server_host = "http://localhost:8000/api";
  const { user } = useContext(UserContext);
  const { notify } = useContext(ToastContext);
  const { carts, getCarts } = useContext(CartContext);
  const [cartsData, setCartsData] = useState<Cart[]>([]);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    setCartsData(carts);
    setAddress(user?.address ?? "");
  }, [carts, user?.address]);

  const handleChangeQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    cartId: number
  ) => {
    // update ui
    const newCartsData = cartsData.map((cart) => {
      if (cart.id === cartId)
        return {
          ...cart,
          quantity: Number(e.target.value),
        };
      else return cart;
    });
    setCartsData(newCartsData);
    // update db
    const updateCart = async () => {
      try {
        const res = await axios.put(
          `${server_host}/payments/${cartId}`,
          {
            quantity: Number(e.target.value),
          },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          getCarts();
        }
      } catch (error) {
        console.error(error);
      }
    };
    updateCart();
  };

  const handleRemoveProduct = (cartId: number) => {
    // update UI
    setCartsData(cartsData.filter((cart) => cart.id !== cartId));
    // update DB
    const deleteCart = async () => {
      try {
        const res = await axios.delete(`${server_host}/payments/${cartId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          getCarts();
        }
      } catch (error) {
        console.error(error);
      }
    };
    deleteCart();
  };

  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        `${server_host}/purchase`,
        {
          address,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        notify("success", "Successfully purchased!");
        getCarts();
      } else {
        notify("error", res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const grandTotal = useMemo(() => {
    const total = cartsData.reduce((total, cart) => {
      return total + cart.quantity * cart.product.price;
    }, 0);
    return total;
  }, [cartsData]);

  return (
    <>
      <Header />
      <PaymentContainer>
        <h1>Shopping Cart</h1>
        <ShoppingCart>
          <ColumnLabels>
            <ProductImage>Image</ProductImage>
            <ProductDetails>Product</ProductDetails>
            <ProductPrice>Price</ProductPrice>
            <ProductQuantity>Quantity</ProductQuantity>
            <ProductRemoval>Remove</ProductRemoval>
            <ProductLinePrice>Total</ProductLinePrice>
          </ColumnLabels>
          {!cartsData.length && (
            <Alert severity="info" sx={{ marginBottom: 5 }}>
              There are no product in the cart!
            </Alert>
          )}
          {cartsData.map((cart) => (
            <Product key={cart.id}>
              <ProductImage>
                <Image
                  src={cart.product.photoURL}
                  alt="product image"
                  width={100}
                  height={110}
                />
              </ProductImage>
              <ProductDetails>
                <ProductTitle>{cart.product.pname}</ProductTitle>
                <ProductDescription>
                  {cart.product.description}
                </ProductDescription>
              </ProductDetails>
              <ProductPrice>{`${cart.product.price}$`}</ProductPrice>
              <ProductQuantity>
                <input
                  type="number"
                  value={cart.quantity}
                  min="1"
                  onChange={(e) => handleChangeQuantity(e, cart.id)}
                />
              </ProductQuantity>
              <ProductRemoval>
                <RemoveProduct onClick={() => handleRemoveProduct(cart.id)}>
                  Remove
                </RemoveProduct>
              </ProductRemoval>
              <ProductLinePrice>
                {cart.product.price * cart.quantity}
              </ProductLinePrice>
            </Product>
          ))}

          <div>
            <TotalsItem>
              <label>Grand Total</label>
              <TotalsValue>{grandTotal}</TotalsValue>
            </TotalsItem>
          </div>

          <ButtonArea>
            <label>Ship to:</label>
            <AddressInput
              type="text"
              placeholder="Input your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              color="success"
              variant="contained"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </ButtonArea>
        </ShoppingCart>
      </PaymentContainer>
      <Footer />
    </>
  );
};

const group = `
zoom: 1;
&:before,
&:after {
    content: '';
    display: table;
}
&:after {
    clear: both;
}
`;

const PaymentContainer = styled.div`
  h1 {
    font-weight: 100;
  }
  padding: 20px 60px;
`;

const ShoppingCart = styled.div`
  ${group}
  margin-top: 45px;
`;

const ProductImage = styled.div`
  float: left;
  width: 20%;
  text-align: center;
`;

const ColumnLabels = styled.div`
  ${group}
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #888;
`;

const ProductDetails = styled.div`
  float: left;
  width: 37%;
`;

const ProductPrice = styled.div`
  float: left;
  width: 12%;
`;

const ProductQuantity = styled.div`
  float: left;
  width: 10%;
  input {
    width: 40px;
  }
`;

const ProductRemoval = styled.div`
  float: left;
  width: 9%;
`;

const ProductLinePrice = styled.div`
  float: left;
  width: 12%;
  text-align: right;
`;

const Product = styled.div`
  ${group}
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ProductTitle = styled.div`
  margin-right: 20px;
  font-weight: bold;
`;

const ProductDescription = styled.p`
  margin: 5px 20px 5px 0;
  line-height: 1.4em;
  color: #888;
  font-size: 12px;
`;

const RemoveProduct = styled.button`
  padding: 4px 8px;
  background-color: #c66;
  color: #fff;
  font-family: $font-bold;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #a44;
  }
`;

const TotalsItem = styled.div`
  ${group}
  float: right;
  clear: both;
  width: 100%;
  margin-bottom: 10px;
  label {
    float: left;
    clear: both;
    width: 79%;
    text-align: right;
    font-weight: bold;
  }
`;

const TotalsValue = styled.div`
  float: right;
  width: 21%;
  text-align: right;
`;

const ButtonArea = styled.div`
  float: right;
  margin-top: 20px;
`;

const AddressInput = styled.input`
  margin-right: 18px;
  margin-left: 4px;
  border: 1px solid #333;
  height: 36px;
  border-radius: 6px;
  padding: 0 16px;
`;

export default Payments;
