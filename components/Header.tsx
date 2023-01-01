import Image from 'next/image'
import styled from 'styled-components'
import LogoI from "../assets/img/logo.jpg";
import { BsFillBagCheckFill } from 'react-icons/bs';
import {BiHelpCircle} from "react-icons/bi";
import {IoLanguage} from "react-icons/io5";

const Header = () => {
  return (
    <HeaderContainer> 
      <Logo>
        <LogoImg>
          <Image src={LogoI} alt="logo image" />
        </LogoImg>
        <TitleShop>Kitty Shop</TitleShop>
      </Logo>
      <InputSearchContainer>
        <SearchForm>
          <SearchInput
              id="search"
              type="text"
              placeholder="Tìm kiếm..."
            />
          <SearchButton>Tìm kiếm</SearchButton>
        </SearchForm>
      </InputSearchContainer>
      <HelpUser>
        <ul>
          <li><a href=''><IoLanguage/></a></li>
          <li><a href=''><BiHelpCircle/></a></li>
        </ul>
      </HelpUser>
      <Cart href=''>
          <BsFillBagCheckFill/>
      </Cart>
    </HeaderContainer>
  )
}
const HeaderContainer = styled.div` 
  display: flex; 
  justify-content: space-between; 
  min-width: 1000px; 
  height: 70px; 
  background-color: #436cf2; 
  border-bottom: 1px solid #3e3e3e; 
`
const Logo = styled.div`
  align-items: center;
  display: flex;
  width: 20%; 
  /* box-shadow: 0 0 3px 6px rgba(238, 10, 10, 0.2);  */
`
const LogoImg = styled.div`
img{align-items: center;
    top: 0;
    width: 70px;
    height: 70px;
    object-position: center;
}
`;
const TitleShop = styled.h2`
  align-items: center;
  color: white;
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
  margin: 10px;
`

const InputSearchContainer = styled.div`
  width: 50%;
  align-items: center;
  margin: 10px;
  padding: 3px;
  background-color: #ffffff;
  border-radius: 4px;
`
const SearchForm = styled.form`
  display: flex;
`
const SearchInput = styled.input`
  width: 200%;
  height: 40px;
  padding: 5px;
  margin: 2px;
  border-radius: 6px;
`
const SearchButton = styled.button`
  width: 200px;  
  height: 40px; 
  padding: 10px; 
  margin: 2px;
  border-radius: 5px;
  background-color: #436cf2;
  font-size: 15px;

`
const HelpUser = styled.div`
  height: 40px; 
  padding: 5px; 
  margin: 20px;
  border-radius: 10px;
  font-size: 25px;
  ul{
    list-style: none;
    display: flex;
    color: white;
    margin-left: 10%;
  };
  li{
    margin-left: 15px;
  }

`

const Cart = styled.a` 
  height: 40px; 
  padding: 5px; 
  margin: 20px;
  border-radius: 10px;
  font-size: 30px;
  color: #436cf2;
  background-color: white;
`

export default Header

