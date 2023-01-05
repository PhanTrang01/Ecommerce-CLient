import { ChangeEvent, MouseEventHandler, useContext, useState } from "react";
import Image from "next/image";
import RegisterBg from "../assets/img/register-bg.jpg";
import styled from "styled-components";
import axios from "axios";
import { ToastContext } from "../contexts/ToastContext";
import { useRouter } from "next/router";
import { handleRegisterError } from "../utils/handleError";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type UserRegister = {
  name: string;
  email: string;
  password: string;
  photoURL: string | null;
};

const Register = () => {
  const router = useRouter();
  const server_host = "http://localhost:8000/api";

  const [dataRegister, setDataRegister] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
    photoURL: null,
  });
  const [isShowPass, setIsShowPass] = useState<boolean>(false);
  const [fileImg, setFileImg] = useState<File>();
  const [img, setImg] = useState<string>("");

  const { notify } = useContext(ToastContext);

  const toggleShowPass = () => {
    setIsShowPass(!isShowPass);
  };

  const register = async (photoURL: string) => {
    try {
      const res = await axios.post(`${server_host}/auth/register`, {
        ...dataRegister,
        photoURL,
      });
      notify("success", res.data.message);
      router.push("/login");
    } catch (error) {
      handleRegisterError(error);
    }
  };

  const registerSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (fileImg) formData.append("file", fileImg);
    try {
      if (!dataRegister.name) {
        notify("warning", "Vui lòng nhập tên người dùng");
        return;
      }
      formData.append("title", dataRegister.name);
      const res = await axios.post(`${server_host}/upload`, formData);
      if (res.data.success) {
        await register(res.data.pathImage);
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
              <RegisterInputText>
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
                      setDataRegister({
                        ...dataRegister,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <PasswordInputContainer>
                  <RegisterLabel htmlFor="password">Password</RegisterLabel>
                  <RegisterInput
                    id="password"
                    type={isShowPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={dataRegister.password}
                    onChange={(e) =>
                      setDataRegister({
                        ...dataRegister,
                        password: e.target.value,
                      })
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
              </RegisterInputText>
              <RegisterInputImage>
                <div>
                  <RegisterLabelImage htmlFor="photoURL">
                    <p>Profile picture</p>
                    {img && (
                      <Image src={img} alt="file" width={200} height={400} />
                    )}
                  </RegisterLabelImage>
                  <RegisterInput
                    id="photoURL"
                    type="file"
                    onChange={handleChooseImg}
                    hidden
                  />
                </div>
              </RegisterInputImage>
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
  width: 680px;
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
  text-align: center;
`;

const RegisterDescription = styled.p`
  font-size: 16px;
  color: #888;
  text-align: center;
`;

const RegisterInputContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
`;

const RegisterInputText = styled.div`
  width: 50%;
`;

const RegisterInputImage = styled.div`
  width: 50%;
`;

const RegisterLabel = styled.label`
  display: block;
  color: hsl(244, 12%, 12%);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
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
  margin-bottom: 16px;
  ::placeholder {
    color: hsl(244, 4%, 36%);
  }
  :focus {
    border: 2px solid #e43f70;
  }
`;

const PasswordInputContainer = styled.div`
  position: relative;
`;

const ShowPasswordButton = styled.span`
  position: absolute;
  right: 12px;
  bottom: 24px;
  cursor: pointer;
`;

const RegisterLabelImage = styled.label`
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

const RegisterBtnContainer = styled.div`
  display: flex;
  column-gap: 12px;
`;

const RegisterButton = styled.button`
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

export default Register;
