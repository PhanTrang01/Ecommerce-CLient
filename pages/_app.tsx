import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import ToastContextProvider from "../contexts/ToastContext";
import { ToastContainer } from "react-toastify";
import UserContextProvider from "../contexts/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <ToastContextProvider>
        <AnimatePresence>
          <Component {...pageProps} />
        </AnimatePresence>
        <ToastContainer />
      </ToastContextProvider>
    </UserContextProvider>
  );
}
