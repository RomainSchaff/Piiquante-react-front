import "./menu.css";
import { Link, useHref } from "react-router-dom";

function Menu({ userLogedIn }) {
  const urlHref = useHref();

  return userLogedIn ? (
    <div id="menu">
      <Link
        to="/Piiquante-react-front/reviews"
        id="all-sauce"
        style={
          urlHref === "/Piiquante-react-front/reviews"
            ? { textDecoration: "underline", fontWeight: "bold" }
            : null
        }
      >
        All sauces
      </Link>
      <Link
        to="/Piiquante-react-front/add-a-sauce"
        id="add-sauce"
        style={
          urlHref === "/Piiquante-react-front/add-a-sauce"
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
