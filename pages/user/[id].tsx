import { useRouter } from "next/router";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../../types";

const User = () => {
  const route = useRouter();
  const id = route.query.id;

  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const server_host = "http://localhost:8000/api";
        const res = await axios.get(`${server_host}/user/${id}`, {
          withCredentials: true,
        });
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);
  return (
    <ProfileContainer>
      <Profile>
        <ProfileBg></ProfileBg>
        <Container>
          <ProfileImage
            style={{ backgroundImage: `url(${userData?.photoURL})` }}
          ></ProfileImage>
          <ProfileInfo>
            <UserName>{userData?.name ?? "No Name"}</UserName>
            <h2>ABOUT</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad
              voluptatibus officiis magnam neque est, ex exercitationem minima
              omnis quidem vitae sapiente molestias alias numquam corporis,
              expedita dolores sed in esse?
            </p>

            <SocialMediaIcons>
              <a href="" target="_blank">
                <FacebookIcon />
              </a>
              <a href="" target="_blank">
                <InstagramIcon />
              </a>
              <a href="" target="_blank">
                <GitHubIcon />
              </a>
              <a href="" target="_blank">
                <TwitterIcon />
              </a>
            </SocialMediaIcons>
          </ProfileInfo>
        </Container>
        <Statistics>
          <p>
            <strong>29</strong> Followers
          </p>
          <p>
            <strong>184</strong> Following
          </p>
          <p>
            <strong>6</strong> Products
          </p>
        </Statistics>
      </Profile>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  font-family: "Montserrat", sans-serif;
  background: linear-gradient(270deg, #ffead1, #ffb6bd, #e0b5ff);
  background-size: 150% 150%;
  animation: backgroundAnimation 10s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
`;

const Profile = styled.div`
  animation: loadProfile 0.6s ease-in-out;
  animation-fill-mode: both;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 750px;
  max-width: 900px;
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem 1rem;
`;

const ProfileBg = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  background: white;
  box-shadow: 0 30px 50px -20px rgba(14, 0, 47, 0.21);
  width: calc(100% - 75px);
  height: calc(100% - 110px);
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
`;

const ProfileImage = styled.div`
  animation: loadProfileImage 1s ease-in-out 0.5s;
  animation-fill-mode: both;
  position: relative;
  border-radius: 10px;
  width: 45%;
  flex: none;
  background-size: cover;
  background-position: center;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    opacity: 0.8;
    mix-blend-mode: screen;
  }
`;

const ProfileInfo = styled.div`
  margin-top: 120px;
  padding: 8% 8% 2% 8%;
  position: relative;
  h1 {
    font-size: 3rem;
    font-weight: 800;
    margin: 0.7rem;
    position: absolute;
    animation-fill-mode: both;
  }
  h2 {
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.2rem;
    margin-top: 0;
    margin-bottom: 5%;
    color: #f63d47;
  }
  p {
    line-height: 1.5rem;
  }
`;

const UserName = styled.h1`
  animation: titleEffect 1s cubic-bezier(0, 0.2, 0.4, 1);
  top: -80px;
  left: 60px;
`;

const SocialMediaIcons = styled.div`
  display: flex;
  a {
    color: #f63d47;
    margin-top: 7%;
    font-size: 1.2rem;
    flex: auto;
    text-align: center;
    transition: text-shadow 0.5s ease;
    &:hover {
      text-shadow: 0px 5px 15px rgba(255, 0, 47, 0.45);
    }
  }
`;

const Statistics = styled.div`
  margin-right: 10px;
  margin-left: 10px;
  line-height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    margin: 3%;
    flex: auto;
    color: #f63d47;
    strong {
      font-size: 1.4rem;
      color: #000;
      font-weight: 200;
      margin-right: 0.3rem;
    }
  }
`;

export default User;
