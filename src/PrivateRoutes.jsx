import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "./components/Context/context.jsx";

function PrivateRoutes() {
  const { userToken } = useContext(TokenContext);
  const token = userToken.token !== "0" ? true : false;

  return token ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
