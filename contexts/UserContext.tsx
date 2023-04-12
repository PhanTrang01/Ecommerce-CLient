import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import { User } from "../types";
import axios from "axios";

interface UserContextProviderProps {
  children: ReactNode;
}

interface UserContextData {
  user: User | undefined;
  getUser: () => void;
}

const UserContextDataInit = {
  user: undefined,
  getUser: () => {},
};

export const UserContext = createContext<UserContextData>(UserContextDataInit);

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const serverHost = "http://localhost:8000/api";

  const [user, setUser] = useState<User | undefined>(undefined);

  const [loadUser, setLoadUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(serverHost + "/auth/user-profile", {
          withCredentials: true,
        });
        const userData = res.data;
        setUser(userData);
      } catch (error) {
        setUser(undefined);
      }
    };

    fetchData();
  }, [loadUser]);

  const userData = useMemo(() => {
    return {
      user,
      getUser: () => {
        setLoadUser((pre) => !pre);
      },
    };
  }, [user]);

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
