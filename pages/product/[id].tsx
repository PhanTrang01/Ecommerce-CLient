import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Product } from "../../types";
import axios from "axios";
import StarRateIcon from "@mui/icons-material/StarRate";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import ProductSuggest from "../../components/ProductSuggest";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { UserContext } from "../../contexts/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../../contexts/ToastContext";
import { CartContext } from "../../contexts/CartContext";

const ProductDetail = () => {
  const route = useRouter();
  const id = route.query.id;

  const [productData, setProductData] = useState<Product | undefined>(
    undefined
  );
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(UserContext);
  const { notify } = useContext(ToastContext);
  const { getCarts } = useContext(CartContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const server_host = "http://localhost:8000/api";
          const res = await axios.get(`${server_host}/products/${id}`);
          const newProductData = res.data.data;
          if (newProductData) setProductData(newProductData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleAddCart = async () => {
    try {
      const server_host = "http://localhost:8000/api";
      const res = await axios.post(
        `${server_host}/payments`,
        {
          productID: id,
          quantity,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.error) {
        notify("error", res.data.message);
      } else {
        notify("success", "Product have added to cart!");
        getCarts();
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async () => {
    try {
      const server_host = "http://localhost:8000/api";
      const res = await axios.delete(`${server_host}/products/${id}`, {
        withCredentials: true,
      });
      if (res.data.error) {
        notify("error", res.data.message);
      } else {
        notify("success", "Successfully deleted product!");
        route.push("/");
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
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
                width="450"
                height="400"
              />
            </ProductImg>
            <ProductContent>
              <ProductTitle>{productData?.pname}</ProductTitle>
              <ProductLink>visit my store</ProductLink>
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
                  <li>
                    Seld by:{" "}
                    <span
                      onClick={() =>
                        route.push(`/user/${productData?.owner.id}`)
                      }
                    >
                      {productData?.owner.name}
                    </span>
                  </li>
                </ul>
              </ProductDetailText>

              {user?.id === productData?.owner.id ? (
                <PurchaseInfo>
                  <Button
                    color="success"
                    variant="contained"
                    sx={{ mr: 2 }}
                    onClick={() => route.push(`/product/edit/${id}`)}
                  >
                    Edit <EditIcon />
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={handleClickOpen}
                  >
                    Delete <DeleteIcon />
                  </Button>
                </PurchaseInfo>
              ) : (
                <PurchaseInfo>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleAddCart}
                  >
                    Add to Cart <AddShoppingCartIcon />
                  </Button>
                </PurchaseInfo>
              )}
            </ProductContent>
          </Card>
        </CardWrapper>
        <hr />
        <ProductSuggestContainer>
          <h1>Similar products</h1>
          <ProductSuggest productId={Number(id)} />
        </ProductSuggestContainer>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure want to delete this product?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={deleteProduct}
              autoFocus
              variant="contained"
              color="info"
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </ProductDetailContainer>
      <Footer />
    </>
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
  margin-left: 80px;
`;

const ProductImg = styled.div`
  padding: 2.8rem 0;
  img {
    object-fit: scale-down;
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
      &:last-child {
        span {
          color: #1976d2;
          cursor: pointer;
        }
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

const ProductSuggestContainer = styled.div`
  padding: 1.5rem 2.5rem;
  h1 {
    font-size: 24px;
    margin-bottom: 1rem;
  }
`;

export default ProductDetail;
