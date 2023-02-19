import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { ToastContext } from "../../contexts/ToastContext";
import axios from "axios";
import Image from "next/image";
import CreateProductBg from "../../assets/img/register-bg.jpg";

type CreateProductData = {
  pname: string;
  description: string;
  price: string;
  quantity: string;
  photoURL: string;
  cate_id: string;
};

const CreateProduct = () => {
  const router = useRouter();
  const server_host = "http://localhost:8000/api";

  const categories = [
    {
      id: "1",
      name: "Xe Cộ",
    },
    {
      id: "2",
      name: "Đồ Điện Tử",
    },
    {
      id: "3",
      name: "Đồ Ăn, Thực Phẩm",
    },
    {
      id: "4",
      name: "Thể Thao & Du Lịch",
    },
    {
      id: "5",
      name: "Sức Khỏe",
    },
    {
      id: "6",
      name: "Nhà Sách Online",
    },
    {
      id: "7",
      name: "Thời Trang Nữ",
    },
    {
      id: "8",
      name: "Thiết Bị Điện Gia Dụng",
    },
    {
      id: "9",
      name: "Thời Trang Nam",
    },
    {
      id: "10",
      name: "Nhà Cửa & Đời Sống",
    },
  ];

  const [dataCreateProduct, setDataCreateProduct] = useState<CreateProductData>(
    {
      pname: "",
      description: "",
      price: "0",
      quantity: "0",
      photoURL: "",
      cate_id: "1",
    }
  );
  const [fileImg, setFileImg] = useState<File>();
  const [img, setImg] = useState<string>("");

  const { notify } = useContext(ToastContext);

  const CreateProductSubmit: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const formData = new FormData();
    if (fileImg) formData.append("photoURL", fileImg);
    try {
      for (const [key, value] of Object.entries(dataCreateProduct)) {
        formData.append(key, value);
      }
      const res = await axios.post(`${server_host}/products`, formData, {
        withCredentials: true,
      });
      if (res.data.error) {
        notify("error", res.data.message);
      } else {
        notify("success", "Successfully created product");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChooseImg = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      if (!file) return;
      if (file.type.indexOf("image/") === -1) {
        notify("warning", "Định dạng file không hợp lệ");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setImg(result as string);
      };
      reader.readAsDataURL(files[0]);

      setFileImg(file);
    }
  };

  return (
    <CreateProductContainer>
      <CreateProductContent>
        <CreateProductImg>
          <Image src={CreateProductBg} alt="CreateProduct image" />
        </CreateProductImg>
        <CreateProductForm>
          <div>
            <CreateProductTilte>Welcome to Kitty Shop</CreateProductTilte>
            <CreateProductDescription>
              Welcome! Please CreateProduct to continue.
            </CreateProductDescription>
          </div>
          <div>
            <CreateInputContainer>
              <CreateInputText>
                <div>
                  <CreateProductLabel htmlFor="name">Name</CreateProductLabel>
                  <CreateInput
                    id="name"
                    type="text"
                    placeholder="Input product name"
                    value={dataCreateProduct.pname}
                    onChange={(e) =>
                      setDataCreateProduct({
                        ...dataCreateProduct,
                        pname: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <CreateProductLabel htmlFor="quantity">
                    Quantity
                  </CreateProductLabel>
                  <CreateInput
                    id="quantity"
                    type="number"
                    value={dataCreateProduct.quantity}
                    onChange={(e) =>
                      setDataCreateProduct({
                        ...dataCreateProduct,
                        quantity: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <CreateProductLabel htmlFor="price">Price</CreateProductLabel>
                  <CreateInput
                    id="price"
                    type="number"
                    placeholder="Enter your password"
                    value={dataCreateProduct.price}
                    onChange={(e) =>
                      setDataCreateProduct({
                        ...dataCreateProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
              </CreateInputText>
              <CreateInputImage>
                <div>
                  <CreateProductLabelImage htmlFor="photoURL">
                    <p>Product Image</p>
                    {img && (
                      <Image src={img} alt="file" width={200} height={400} />
                    )}
                  </CreateProductLabelImage>
                  <CreateInput
                    id="photoURL"
                    type="file"
                    onChange={handleChooseImg}
                    hidden
                  />
                </div>
              </CreateInputImage>
            </CreateInputContainer>
            <div>
              <CreateProductLabel htmlFor="description">
                Description
              </CreateProductLabel>
              <CreateTextArea
                id="description"
                rows={3}
                placeholder="Input description"
                value={dataCreateProduct.description}
                onChange={(e) =>
                  setDataCreateProduct({
                    ...dataCreateProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <CreateProductLabel htmlFor="category">
                Category
              </CreateProductLabel>
              <CreateSelect
                id="category"
                value={dataCreateProduct.cate_id}
                onChange={(e) =>
                  setDataCreateProduct({
                    ...dataCreateProduct,
                    cate_id: e.target.value,
                  })
                }
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </CreateSelect>
            </div>
          </div>
          <div>
            <CreateProductBtnContainer>
              <CreateProductButton onClick={CreateProductSubmit}>
                Create Product
              </CreateProductButton>
            </CreateProductBtnContainer>
          </div>
        </CreateProductForm>
      </CreateProductContent>
    </CreateProductContainer>
  );
};

const inputStyle = `
width: 100%;
padding: 14px 12px;
border-radius: 6px;
border: 2px solid hsl(244, 4%, 36%);
background-color: hsla(244, 16%, 92%, 0.6);
color: hsl(244, 12%, 12%);
font-size: 14px;
font-weight: 500;
transition: border 0.4s;
margin-bottom: 16px;
::placeholder {
  color: hsl(244, 4%, 36%);
}
:focus {
  border: 2px solid #e43f70;
}
`;

const CreateProductContainer = styled.div``;

const CreateProductContent = styled.div`
  display: grid;
  position: relative;
  height: 100vh;
  align-items: center;
`;

const CreateProductImg = styled.div`
  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const CreateProductForm = styled.form`
  display: grid;
  row-gap: 32px;
  padding: 48px;
  width: 680px;
  justify-self: center;
  background-color: hsla(244, 16%, 92%, 0.6);
  border: 2px solid hsla(244, 16%, 92%, 0.75);
  margin-inline: 24px;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  margin-bottom: auto;
`;

const CreateProductTilte = styled.h1`
  color: hsl(244, 12%, 12%);
  font-size: 20px;
  margin-bottom: 8px;
  text-align: center;
`;

const CreateProductDescription = styled.p`
  font-size: 16px;
  color: #888;
  text-align: center;
`;

const CreateInputContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
`;

const CreateInputText = styled.div`
  width: 50%;
`;

const CreateInputImage = styled.div`
  width: 50%;
`;

const CreateProductLabel = styled.label`
  display: block;
  color: hsl(244, 12%, 12%);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
`;

const CreateInput = styled.input`
  ${inputStyle}
`;

const CreateTextArea = styled.textarea`
  ${inputStyle}
`;

const CreateSelect = styled.select`
  ${inputStyle}
`;

const CreateProductLabelImage = styled.label`
  position: relative;
  width: 100%;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  border: 2px dashed hsl(244, 4%, 36%);
  cursor: pointer;
  i,
  p {
    color: hsl(244, 4%, 36%);
  }
  i {
    font-size: 40px;
  }
  p {
    font-size: 24px;
  }
  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CreateProductBtnContainer = styled.div`
  display: flex;
  column-gap: 12px;
`;

const CreateProductButton = styled.button`
  width: 100%;
  padding: 14px 32px;
  background-color: #e43f70;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 6px 24px #f78084;
  margin-bottom: 16px;
  cursor: pointer;
  border-radius: 6px;
`;

export default CreateProduct;
