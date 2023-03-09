import { createContext, useState } from "react";

export const TokenContext = createContext(null);

export const UserTokenProvider = ({ children }) => {
  const userData = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { userId: "0", token: "0" };
  const [userToken, setUserToken] = useState(userData);
  return (
    <TokenContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </TokenContext.Provider>
  );
};
