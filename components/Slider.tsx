import Button from "@mui/material/Button";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider1 from "../assets/img/slider1.jpg";
import Slider2 from "../assets/img/slider2.jpg";
import Slider3 from "../assets/img/slider3.jpg";

const Slider = () => {
  const sliders = [
    {
      banner: Slider1,
      label: "Shoes Fashion",
      title: "Brand New Shoes",
      description: "Come and get it!",
    },
    {
      banner: Slider2,
      label: "Quick Fashion",
      title: "With Luxury items",
      description: "Fit your wardrobe",
    },
    {
      banner: Slider3,
      label: "Quick Offer",
      title: "Extra 50% Off",
      description: "Wooden Minimal Sofa",
    },
  ];
  return (
    <Container>
      <Wrapper>
        <SliderWrapper>
          <Carousel
            showStatus={false}
            showArrows={false}
            autoPlay
            infiniteLoop
            showThumbs={false}
          >
            {sliders.map((slider, index) => (
              <Item key={index}>
                <SliderImage>
                  <Image src={slider.banner} alt="Slider image" fill={true} />
                </SliderImage>
                <TextContent>
                  <div>
                    <h4>{slider.label}</h4>
                  </div>
                  <div>
                    <h2>{slider.description}</h2>
                    <h1>{slider.title}</h1>
                  </div>
                  <div>
                    <Button variant="contained" color="error">
                      Shop Now
                    </Button>
                  </div>
                </TextContent>
              </Item>
            ))}
          </Carousel>
        </SliderWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  width: calc(100% - (300px + 3.5em));
  margin-left: auto;
`;

const SliderWrapper = styled.div`
  position: relative;
  padding-right: 20px;
`;

const Item = styled.div`
  position: relative;
  width: 100%;
  ::before {
    content: "";
    position: absolute;
    top: 30%;
    left: 0;
    width: 450px;
    height: 300px;
    background-color: #fff;
    z-index: 1;
    filter: blur(50px);
    opacity: 0.8;
  }
`;

const SliderImage = styled.div`
  height: 405px;
  img {
    object-fit: cover;
  }
`;

const TextContent = styled.div`
  position: absolute;
  bottom: 0;
  padding: 0 0 8% 8%;
  text-align: left;
  z-index: 1;
  div {
    margin-bottom: 12px;
    h2 {
      font-size: 28px;
      font-weight: 400;
    }
    h1 {
      color: #453c5a;
      text-transform: uppercase;
    }
    h4 {
      font-size: 12px;
      font-weight: 600;
      width: fit-content;
      padding: 4px 10px;
      background-color: #333;
      color: #fff;
      border-radius: 4px;
    }
  }
`;

export default Slider;
