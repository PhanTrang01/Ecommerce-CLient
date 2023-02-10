import Image from "next/image";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "./Slider";

const Sidebar = () => {
  const categories = [
    {
      id: 1,
      name: "Beauty",
      iconURL: "https://cdn-icons-png.flaticon.com/512/2960/2960162.png",
    },
    {
      id: 2,
      name: "ELectronic",
      iconURL: "https://cdn-icons-png.flaticon.com/512/2960/2960162.png",
    },
    {
      id: 3,
      name: "Women's Fashion",
      iconURL: "https://cdn-icons-png.flaticon.com/512/2960/2960162.png",
    },
    {
      id: 4,
      name: "Men's Fashion",
      iconURL: "https://cdn-icons-png.flaticon.com/512/2960/2960162.png",
    },
    {
      id: 5,
      name: "Health",
      iconURL: "https://cdn-icons-png.flaticon.com/512/2960/2960162.png",
    },
    {
      id: 6,
      name: "Home & Life",
      iconURL: "https://cdn-icons-png.flaticon.com/512/2960/2960162.png",
    },
    {
      id: 7,
      name: "Pet Supplies",
      iconURL: "https://cdn-icons-png.flaticon.com/512/2960/2960162.png",
    },
    {
      id: 8,
      name: "Sports & Travel",
      iconURL: "https://cdn-icons-png.flaticon.com/512/2960/2960162.png",
    },
    {
      id: 9,
      name: "Cars, Motorbikes, Bicycles",
      iconURL: "https://cdn-icons-png.flaticon.com/512/2960/2960162.png",
    },
    {
      id: 10,
      name: "Best Seller",
      iconURL: "https://cdn-icons-png.flaticon.com/512/2960/2960162.png",
    },
  ];
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
                  <li key={category.id}>
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
            <SearchInput placeholder="Search for products"></SearchInput>
            <SearchBtn>Search</SearchBtn>
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

export default Sidebar;
