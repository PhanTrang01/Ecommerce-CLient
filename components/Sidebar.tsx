import Image from "next/image";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "./Slider";
import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ToastContext } from "../contexts/ToastContext";
import { Product } from "../types";

interface SideBarProps {
  productsData: Product[];
  setProductsCallback: Dispatch<any>;
}

const Sidebar = ({ productsData, setProductsCallback }: SideBarProps) => {
  const server_host = "http://localhost:8000/api";

  const { notify } = useContext(ToastContext);

  const [productName, setProductName] = useState<string>("");
  const [cateId, setCateId] = useState<string>("0");

  const [fileImg, setFileImg] = useState<File>();
  const [img, setImg] = useState<string>("");

  const searchImageSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const image_host = "http://localhost:5000";
    e.preventDefault();
    const formData = new FormData();
    if (fileImg) formData.append("file", fileImg);
    try {
      const res = await axios.post(`${image_host}`, formData);
      if (res.data) {
        console.log(res.data);
        const productIdObj = res.data;
        const dataSearch = Object.values(productIdObj).map((id) => {
          const data = productsData.find((product) => product.id === id);
          if (data) {
            return data;
          } else {
            return;
          }
        });
        setProductsCallback(dataSearch);
        setImg("");
      } else {
        notify("warning", "Problem uploading photos");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${server_host}/categoies-search/${cateId}`
        );
        const productData = res.data.data;
        setProductsCallback(productData);
      } catch (error) {
        console.error(error);
      }
    };
    if (cateId !== "0") fetchData();
  }, [cateId, setProductsCallback]);

  const categories = [
    {
      id: "1",
      name: "Xe Cộ",
      iconURL:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/car.png",
    },
    {
      id: "2",
      name: "Đồ Điện Tử",
      iconURL:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/circuit.png",
    },
    {
      id: "3",
      name: "Đồ Ăn, Thực Phẩm",
      iconURL:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/restaurant.png",
    },
    {
      id: "4",
      name: "Thể Thao & Du Lịch",
      iconURL:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/hiking.png",
    },
    {
      id: "5",
      name: "Sức Khỏe",
      iconURL:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/healthcare.png",
    },
    {
      id: "6",
      name: "Nhà Sách Online",
      iconURL:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/open-book.png",
    },
    {
      id: "7",
      name: "Thời Trang Nữ",
      iconURL:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/dress.png",
    },
    {
      id: "8",
      name: "Thiết Bị Điện Gia Dụng",
      iconURL:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/houseware.png",
    },
    {
      id: "9",
      name: "Thời Trang Nam",
      iconURL:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/male-clothes.png",
    },
    {
      id: "10",
      name: "Nhà Cửa & Đời Sống",
      iconURL:
        "https://van-bucket.s3.ap-southeast-1.amazonaws.com/images/originals/routine.png",
    },
  ];

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${server_host}/search/${productName}`);
      const productData = res.data;
      setProductsCallback(productData);
      setProductName("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SubHeader>
        <LeftContainer>
          <CategoryDepartment>
            <HeadDepartment>
              <div>All departments</div>
              <MiniText>Total 69 Products</MiniText>
              <TriggerDepartment>
                <MenuIcon />
              </TriggerDepartment>
            </HeadDepartment>
            <MenuDepartment>
              <ul>
                {categories.map((category) => (
                  <li key={category.id} onClick={() => setCateId(category.id)}>
                    <CategoryBox>
                      <CategoryIcon>
                        <Image
                          loader={(_src) =>
                            "https://cdn-icons-png.flaticon.com/512/2960/2960162.png"
                          }
                          unoptimized
                          src={category.iconURL}
                          alt="icon image"
                          width={28}
                          height={28}
                        />
                      </CategoryIcon>
                      <span>{category.name}</span>
                    </CategoryBox>
                  </li>
                ))}
              </ul>
            </MenuDepartment>
          </CategoryDepartment>
        </LeftContainer>
        <RightContainer>
          <SearchBox>
            <span>
              <SearchIcon />
            </span>
            <SearchInput
              placeholder="Search for products"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <CameraIcon>
              <SearchLabelImage htmlFor="image">
                {img ? (
                  <Image src={img} alt="file" width={200} height={400} />
                ) : (
                  <CameraAltIcon />
                )}
              </SearchLabelImage>
              <input type="file" id="image" hidden onChange={handleChooseImg} />
            </CameraIcon>
            {img ? (
              <SearchBtn onClick={searchImageSubmit}>Search</SearchBtn>
            ) : (
              <SearchBtn onClick={handleSearch}>Search</SearchBtn>
            )}
          </SearchBox>
        </RightContainer>
      </SubHeader>
      <Slider />
    </>
  );
};

const SubHeader = styled.div`
  display: flex;
  background-color: #453c5a;
  padding: 24px;
  margin-bottom: 32px;
  border-radius: 4px;
`;

const LeftContainer = styled.div``;

const CategoryDepartment = styled.div`
  position: relative;
  z-index: 10;
  bottom: -24px;
`;

const HeadDepartment = styled.div`
  position: relative;
  width: 300px;
  padding: 12px 24px;
  background-color: #fe6b6a;
  border-radius: 7px 7px 0 0;
  color: #fff;
`;

const MiniText = styled.div`
  color: #fff;
  font-size: 12px;
`;

const TriggerDepartment = styled.a`
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px;
  width: 60px;
  height: 60px;
`;

const MenuDepartment = styled.div`
  position: absolute;
  top: 100%;
  width: 300px;
  background-color: #fff;
  border: 1px solid #888;
  border-top: 0;
  border-bottom: 0;
  li {
    font-weight: 600;
    border-bottom: 1px solid #888;
    :hover {
      background-color: #888;
      color: #fff;
    }
  }
`;

const CategoryBox = styled.div`
  cursor: pointer;
  height: 46px;
  font-size: 16px;
  align-items: center;
  padding: 0 24px;
`;

const CategoryIcon = styled.span`
  position: relative;
  margin-right: 10px;
  bottom: -7px;
`;

const RightContainer = styled.div`
  flex: 1;
  max-width: 600px;
  margin-left: auto;
`;

const SearchBox = styled.div`
  position: relative;
  color: #888;
  span,
  button {
    position: absolute;
    top: 0;
    padding: 14px 24px;
    font-size: 16px;
    height: 100%;
  }
`;

const SearchInput = styled.input`
  line-height: 52px;
  padding: 0 112px 0 72px;
  width: 100%;
  font-size: 16px;
  border-radius: 7px;
  font-weight: 500;
`;

const SearchBtn = styled.button`
  right: 0;
  font-size: 14px;
  font-weight: 600;
  background-color: #fe6b6a;
  color: #fff;
  border-radius: 0 7px 7px 0;
  cursor: pointer;
  :hover {
    background-color: #0a011b;
  }
`;

const CameraIcon = styled.form`
  position: absolute;
  top: 6px;
  right: 120px;
  label {
    cursor: pointer;
  }
`;

const SearchLabelImage = styled.label`
  position: relative;
  width: 40px;
  height: 40px;
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

export default Sidebar;
