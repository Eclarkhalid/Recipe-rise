import { createContext, useState, ReactNode } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
