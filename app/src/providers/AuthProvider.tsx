import { http } from "../services";
import { createContext, ReactNode, useEffect, useState } from "react";
import type { IUser } from "../interfaces";

export interface IAuthContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const response = await http.getMe();
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch {
      console.error("An error occurred. Please try again.");
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isFetching, setIsFetching }}>
      {children}
    </AuthContext.Provider>
  );
};
