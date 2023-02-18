import styled from "styled-components";
import FacebookIcon from "../assets/icon/facebook-icon.png";
import InstagramIcon from "../assets/icon/instagram-icon.png";
import TelegramIcon from "../assets/icon/telegram-icon.png";
import TwitterIcon from "../assets/icon/twitter-icon.png";
import YoutubeIcon from "../assets/icon/youtube-icon.png";
import Image from "next/image";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterContent>
          <FooterCol>
            <Column>
              <h2>My account</h2>
              <p>Store location</p>
              <p>Order history</p>
              <p>Wish list</p>
              <p>Newsletter</p>
              <p>Special offers</p>
              <p>Gift certificates</p>
              <p>Affiliate</p>
            </Column>
          </FooterCol>
          <FooterCol>
            <Column>
              <h2>Information</h2>
              <p>About us</p>
              <p>Delivery information</p>
              <p>Privacy policy</p>
              <p>Brands</p>
              <p>Contact us</p>
              <p>Returns</p>
              <p>Site map</p>
            </Column>
          </FooterCol>
          <FooterCol>
            <h2>Contact us</h2>
            <p>
              Hi, we are always open for cooperation and suggestions, <br />
              contact us in one of the ways below:
            </p>
            <p>
              Enter your email address below to subscribe to our newsletter
              <br />
              and keep up to date with discounts and special offers.
            </p>
            <Email>
              <input type="email" placeholder="user@example.com" />
              <button>Subscribe</button>
            </Email>
            <p>Follow us on social networks:</p>
            <Social>
              <a href="" target="_blank">
                <Image src={FacebookIcon} alt="" />
              </a>
              <a href="" target="_blank">
                <Image src={TwitterIcon} alt="" />
              </a>
              <a href="" target="_blank">
                <Image src={InstagramIcon} alt="" />
              </a>
              <a href="" target="_blank">
                <Image src={YoutubeIcon} alt="" />
              </a>
              <a href="" target="_blank">
                <Image src={TwitterIcon} alt="" />
              </a>
              <a href="" target="_blank">
                <Image src={TelegramIcon} alt="" />
              </a>
            </Social>
          </FooterCol>
        </FooterContent>
      </FooterContainer>
      <FooterDesc>
        <FooterContainer>
          <FooterText>
            <p>
              Powered by <span>Team2</span> - Designed by <span>Rin</span>
            </p>
          </FooterText>
        </FooterContainer>
      </FooterDesc>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  background-color: rgb(58, 58, 58);
  margin-top: 40px;
`;

const FooterContainer = styled.div`
  padding: 0 150px;
  p {
    color: rgb(136, 136, 136);
  }
  span {
    color: white;
    font-weight: bold;
  }
  @media (max-width: 1024px) {
    padding: 0 80px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  padding: 50px;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    color: white;
    font-size: 22px;
  }
  p {
    color: rgb(136, 136, 136);
    margin-bottom: 10px;
  }
  &:first-child {
    gap: 25px;
  }
  &:last-child {
    gap: 15px;
  }
  @media (max-width: 1024px) {
    &:first-child {
      display: none;
    }
  }
`;

const Column = styled.div`
  &:first-child {
    margin-right: 50px;
  }
  p:first-child {
    margin-bottom: 25px;
  }
  p:not(p:first-child) {
    margin-bottom: 12px;
  }
`;

const Email = styled.div`
  display: flex;
  input {
    width: 300px;
    height: 40px;
    font-size: 17px;
    color: white;
    background-color: rgb(76, 76, 76);
    padding-left: 10px;
  }
  button {
    width: 200px;
    height: 40px;
    color: white;
    background-color: rgb(229, 39, 39);
    padding-left: 10px;
    text-align: center;
    margin-left: -30px;
    font-weight: bold;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const Social = styled.div`
  display: flex;
  gap: 20px;
  a {
    width: 40px;
    height: 40px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FooterDesc = styled.div`
  background-color: rgb(43, 43, 43);
`;

const FooterText = styled.div`
  padding: 25px 80px;
  text-align: center;
`;

export default Footer;
