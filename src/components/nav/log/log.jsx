import "./log.css";
import { useContext } from "react";
import { TokenContext } from "../../Context/context";
import { Link, useHref } from "react-router-dom";

function Log({ userLogedIn }) {
  const { setUserToken } = useContext(TokenContext);
  const urlHref = useHref();

  function handleLogout() {
    setUserToken({ userId: "0", token: "0" });
    localStorage.clear();
  }

  return userLogedIn ? (
    <div id="log-container">
      <Link to="/Piiquante-react-front/" id="logout" onClick={handleLogout}>
        logout
      </Link>
    </div>
  ) : (
    <div id="log-container">
      <Link
        to="/Piiquante-react-front/"
        id="login"
        style={
          urlHref === "/Piiquante-react-front/login" ||
          urlHref === "/Piiquante-react-front/"
            ? { textDecoration: "underline", fontWeight: "bold" }
            : null
        }
      >
        Login
      </Link>
      <Link
        to="/Piiquante-react-front/signup"
        id="signup"
        style={
          urlHref === "/Piiquante-react-front/signup"
            ? { textDecoration: "underline", fontWeight: "bold" }
            : null
        }
      >
        sign up
      </Link>
    </div>
  );
}

export default Log;
