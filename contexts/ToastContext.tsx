import { createContext, ReactNode } from "react";
import { toast } from "react-toastify";

type TYPE = "success" | "warning" | "error" | "info" | undefined;

interface ToastContextProps {
  children: ReactNode;
}

interface ToastContextDefault {
  notify: (type: TYPE, message: string) => void;
}

const ToastContextInit = {
  notify: () => {},
};

export const ToastContext =
  createContext<ToastContextDefault>(ToastContextInit);

const ToastContextProvider = ({ children }: ToastContextProps) => {
  const notify = (type: TYPE, message: string) => {
    if (type) {
      switch (type) {
        case "success":
          toast.success(message, { autoClose: 1500 });
          break;
        case "warning":
          toast.warning(message);
          break;
        case "error":
          toast.error(message);
          break;
        case "info":
          toast.info(message);
          break;
      }
    } else {
      toast(message);
    }
  };
  const toastContextData = {
    notify,
  };

  return (
    <ToastContext.Provider value={toastContextData}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
