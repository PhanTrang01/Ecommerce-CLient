import { toast } from "react-toastify";

export const handleLoginError = (err: any) => {
  const res = err.response;
  if (res.status === 400) {
    console.error("Bad Request");
    if (res.data.email?.length > 0) {
      toast.error(res.data.email[0]);
    }
    if (res.data.password?.length > 0) {
      toast.error(res.data.password[0]);
    }
  } else if (res.status === 401) {
    console.error("Unauthorized");
    toast.error("Email or password incorrect!!");
  } else if (res.status === 500) {
    console.error("Internal server error");
    toast.error("Có lỗi xảy ra, vui lòng thử lại!");
  }
};

export const handleRegisterError = (error: any) => {
  const res = error.response;

  if (res.status === 400) {
    console.error("Bad Request");
    if (res.data.name?.length > 0) {
      toast.error(res.data.name[0]);
    }
    if (res.data.email?.length > 0) {
      toast.error(res.data.email[0]);
    }
    if (res.data.password?.length > 0) {
      toast.error(res.data.password[0]);
    }
    if (res.data.photoURL?.length > 0) {
      toast.error(res.data.photoURL[0]);
    }
  } else if (res.status === 500) {
    console.error("Internal server error");
    toast.error("Có lỗi xảy ra, vui lòng thử lại!");
  }
};
