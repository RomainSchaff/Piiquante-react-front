import "./menu.css";
import { Link, useHref } from "react-router-dom";

function Menu({ userLogedIn }) {
  const urlHref = useHref();

  return userLogedIn ? (
    <div id="menu">
      <Link
        to="/reviews"
        id="all-sauce"
        style={
          urlHref === "/reviews"
            ? { textDecoration: "underline", fontWeight: "bold" }
            : null
        }
      >
        All sauces
      </Link>
      <Link
        to="/add-a-sauce"
        id="add-sauce"
        style={
          urlHref === "/add-a-sauce"
            ? { textDecoration: "underline", fontWeight: "bold" }
            : null
        }
      >
        Add sauce
      </Link>
    </div>
  ) : (
    <div id="menu"></div>
  );
}

export default Menu;
