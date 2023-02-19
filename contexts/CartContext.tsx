import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { Cart, ECartStatus } from "../types";
import axios from "axios";

interface CartContextProviderProps {
  children: ReactNode;
}

interface CartContextData {
  carts: Cart[];
  getCarts: () => void;
}

const CartContextDataInit = {
  carts: [],
  getCarts: () => {},
};

export const CartContext = createContext<CartContextData>(CartContextDataInit);

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const serverHost = "http://localhost:8000/api";

  const [carts, setCarts] = useState<Cart[]>([]);

  const [loadCarts, setLoadCarts] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(serverHost + "/payments", {
          withCredentials: true,
        });
        const cartDatas = res.data.data;
        setCarts(
          cartDatas.filter(
            (cartData: Cart) => cartData.status === ECartStatus.ORDER
          )
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [loadCarts]);

  const cartData = useMemo(() => {
    return {
      carts,
      getCarts: () => {
        setLoadCarts((pre) => !pre);
      },
    };
  }, [carts]);

  return (
    <CartContext.Provider value={cartData}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
