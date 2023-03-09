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
      <Link to="/" id="logout" onClick={handleLogout}>
        logout
      </Link>
    </div>
  ) : (
    <div id="log-container">
      <Link
        to="/"
        id="login"
        style={
          urlHref === "/login" || urlHref === "/"
            ? { textDecoration: "underline", fontWeight: "bold" }
            : null
        }
      >
        Login
      </Link>
      <Link
        to="/signup"
        id="signup"
        style={
          urlHref === "/signup"
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
