import React from "react";
import Image from "next/image";
import LoginBg from "../assets/img/login-bg.jpg";
import styled from "styled-components";

const Login = () => {
  return (
    <LoginContainer>
      <LoginContent>
        <LoginImg>
          <Image src={LoginBg} alt="login image" />
        </LoginImg>
        <LoginForm>
          <div>
            <LoginTilte>Welcome to Kitty Shop</LoginTilte>
            <LoginDescription>
              Welcome! Please login to continue.
            </LoginDescription>
          </div>
          <div>
            <LoginInputContainer>
              <div>
                <LoginLabel htmlFor="email">Email</LoginLabel>
                <LoginInput
                  id="email"
                  type="text"
                  placeholder="Input your email"
                />
              </div>
              <div>
                <LoginLabel htmlFor="password">Password</LoginLabel>
                <LoginInput
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </LoginInputContainer>
          </div>
          <div>
            <LoginBtnContainer>
              <LoginButton>Login</LoginButton>
              <RegisterButton>Sign Up</RegisterButton>
            </LoginBtnContainer>
            <LoginForgot href="#">Forgot Password?</LoginForgot>
          </div>
        </LoginForm>
      </LoginContent>
    </LoginContainer>
  );
};

const LoginContainer = styled.div``;

const LoginContent = styled.div`
  display: grid;
  position: relative;
  height: 100vh;
  align-items: center;
`;

const LoginImg = styled.div`
  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const LoginForm = styled.form`
  display: grid;
  row-gap: 32px;
  padding: 48px;
  width: 480px;
  justify-self: center;
  background-color: hsla(244, 16%, 92%, 0.6);
  border: 2px solid hsla(244, 16%, 92%, 0.75);
  margin-inline: 24px;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  margin-bottom: auto;
`;

const LoginTilte = styled.h1`
  color: hsl(244, 12%, 12%);
  font-size: 20px;
  margin-bottom: 8px;
`;

const LoginDescription = styled.p`
  font-size: 16px;
  color: #888;
`;

const LoginInputContainer = styled.div`
  display: grid;
  row-gap: 12px;
  margin-bottom: 8px;
`;

const LoginLabel = styled.label`
  display: block;
  color: hsl(244, 12%, 12%);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 14px 12px;
  border-radius: 6px;
  border: 2px solid hsl(244, 4%, 36%);
  background-color: hsla(244, 16%, 92%, 0.6);
  color: hsl(244, 12%, 12%);
  font-size: 14px;
  font-weight: 500;
  transition: border 0.4s;
  ::placeholder {
    color: hsl(244, 4%, 36%);
  }
  :focus {
    border: 2px solid hsl(244, 75%, 57%);
  }
`;

const LoginBtnContainer = styled.div`
  display: flex;
  column-gap: 12px;
`;

const LoginButton = styled.button`
  width: 50%;
  padding: 14px 32px;
  background-color: hsl(244, 75%, 57%);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 6px 24px hsla(244, 75%, 48%, 0.5);
  margin-bottom: 16px;
  cursor: pointer;
  border-radius: 6px;
`;

const RegisterButton = styled.button`
  width: 50%;
  padding: 14px 32px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
  background-color: hsla(244, 16%, 92%, 0.6);
  border: 2px solid hsl(244, 75%, 57%);
  color: hsl(244, 75%, 57%);
  cursor: pointer;
  border-radius: 6px;
`;

const LoginForgot = styled.a`
  font-size: 12px;
  font-weight: 600;
  color: hsl(244, 75%, 57%);
  text-decoration: none;
`;

export default Login;
