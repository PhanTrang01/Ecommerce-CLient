import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import ToastContextProvider from "../contexts/ToastContext";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      <ToastContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </ToastContextProvider>
    </AnimatePresence>
  );
}
