import { MouseEventHandler, useContext, useState } from "react";
import Image from "next/image";
import RegisterBg from "../assets/img/login-bg.jpg";
import styled from "styled-components";
import axios from "axios";
import { setCookie } from "cookies-next";
import { ToastContext } from "../contexts/ToastContext";
import { useRouter } from "next/router";
import { handleRegisterError } from "../utils/handleError";

type UserRegister = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();

  const [dataRegister, setDataRegister] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
  });

  const { notify } = useContext(ToastContext);

  const register = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        dataRegister
      );
      notify("success", res.data.message);
      router.push("/login");
    } catch (error) {
      handleRegisterError(error);
    }
  };

  const registerSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    await register();
  };

  return (
    <RegisterContainer>
      <RegisterContent>
        <RegisterImg>
          <Image src={RegisterBg} alt="Register image" />
        </RegisterImg>
        <RegisterForm>
          <div>
            <RegisterTilte>Welcome to Kitty Shop</RegisterTilte>
            <RegisterDescription>
              Welcome! Please Register to continue.
            </RegisterDescription>
          </div>
          <div>
            <RegisterInputContainer>
              <div>
                <RegisterLabel htmlFor="name">Username</RegisterLabel>
                <RegisterInput
                  id="name"
                  type="text"
                  placeholder="Input your name"
                  value={dataRegister.name}
                  onChange={(e) =>
                    setDataRegister({ ...dataRegister, name: e.target.value })
                  }
                />
              </div>
              <div>
                <RegisterLabel htmlFor="email">Email</RegisterLabel>
                <RegisterInput
                  id="email"
                  type="text"
                  placeholder="Input your email"
                  value={dataRegister.email}
                  onChange={(e) =>
                    setDataRegister({ ...dataRegister, email: e.target.value })
                  }
                />
              </div>
              <div>
                <RegisterLabel htmlFor="password">Password</RegisterLabel>
                <RegisterInput
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={dataRegister.password}
                  onChange={(e) =>
                    setDataRegister({
                      ...dataRegister,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </RegisterInputContainer>
          </div>
          <div>
            <RegisterBtnContainer>
              <RegisterButton onClick={registerSubmit}>Register</RegisterButton>
            </RegisterBtnContainer>
          </div>
        </RegisterForm>
      </RegisterContent>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div``;

const RegisterContent = styled.div`
  display: grid;
  position: relative;
  height: 100vh;
  align-items: center;
`;

const RegisterImg = styled.div`
  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const RegisterForm = styled.form`
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

const RegisterTilte = styled.h1`
  color: hsl(244, 12%, 12%);
  font-size: 20px;
  margin-bottom: 8px;
`;

const RegisterDescription = styled.p`
  font-size: 16px;
  color: #888;
`;

const RegisterInputContainer = styled.div`
  display: grid;
  row-gap: 12px;
  margin-bottom: 8px;
`;

const RegisterLabel = styled.label`
  display: block;
  color: hsl(244, 12%, 12%);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const RegisterInput = styled.input`
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

const RegisterBtnContainer = styled.div`
  display: flex;
  column-gap: 12px;
`;

const RegisterButton = styled.button`
  width: 100%;
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

export default Register;
