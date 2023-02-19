import { MouseEventHandler, useContext, useState } from "react";
import Image from "next/image";
import LoginBg from "../assets/img/login-bg.jpg";
import styled from "styled-components";
import axios from "axios";
import { setCookie } from "cookies-next";
import { ToastContext } from "../contexts/ToastContext";
import { useRouter } from "next/router";
import { handleLoginError } from "../utils/handleError";
import { UserContext } from "../contexts/UserContext";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type UserLogin = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();

  const [dataLogin, setDataLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [isShowPass, setIsShowPass] = useState<boolean>(false);

  const { notify } = useContext(ToastContext);
  const { getUser } = useContext(UserContext);

  const toggleShowPass = () => {
    setIsShowPass(!isShowPass);
  };

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        dataLogin
      );
      console.log(res.data.access_token);
      setCookie("token", res.data.access_token, {
        expires: new Date(res.data.expires_in),
      });
      notify("success", "Đăng nhập thành công🙂");
      getUser();
      router.push("/");
    } catch (error) {
      handleLoginError(error);
    }
  };

  const loginSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    await login();
  };

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
                  value={dataLogin.email}
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, email: e.target.value })
                  }
                />
              </div>
              <PasswordInputContainer>
                <LoginLabel htmlFor="password">Password</LoginLabel>
                <LoginInput
                  id="password"
                  type={isShowPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={dataLogin.password}
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, password: e.target.value })
                  }
                />
                <ShowPasswordButton>
                  {isShowPass ? (
                    <RemoveRedEyeIcon onClick={toggleShowPass} />
                  ) : (
                    <VisibilityOffIcon onClick={toggleShowPass} />
                  )}
                </ShowPasswordButton>
              </PasswordInputContainer>
            </LoginInputContainer>
          </div>
          <div>
            <LoginBtnContainer>
              <LoginButton onClick={loginSubmit}>Login</LoginButton>
              <RegisterButton
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/register");
                }}
              >
                Sign Up
              </RegisterButton>
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

const PasswordInputContainer = styled.div`
  position: relative;
`;

const ShowPasswordButton = styled.span`
  position: absolute;
  right: 12px;
  bottom: 8px;
  cursor: pointer;
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
