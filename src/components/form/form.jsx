import { useContext, useState } from "react";
import { TokenContext } from "../Context/context";
import "./form.css";
import { useNavigate } from "react-router-dom";

function Form({ state }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserToken } = useContext(TokenContext);
  const navigate = useNavigate();
  function handleLogs(e) {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    }
    if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  }

  function sendLogin(e) {
    e.preventDefault();
    const body = { email: email, password: password };
    const headers = { "Content-Type": "application/json" };
    const myInit = {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    };

    fetch("http://localhost:3000/api/auth/login", myInit)
      .then((response) => response.json())
      .then((data) => {
        setUserToken(data);
        localStorage.setItem("user", JSON.stringify(data));
        console.log(data);
        navigate("/Piiquante-react-front/reviews");
      })
      .catch((err) => console.log(err));
  }

  function sendSignup(e) {
    e.preventDefault();
    const body = { email: email, password: password };
    const headers = { "Content-Type": "application/json" };
    const myInit = {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    };

    fetch("http://localhost:3000/api/auth/signup", myInit)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/Piiquante-react-front/login");
      })
      .catch((err) => console.log(err));
  }

  return (
    <form method="post" id="log-form">
      <label htmlFor="email">Email: </label>
      <input
        type="text"
        name="email"
        id="email"
        onChange={handleLogs}
        required
      ></input>
      <label htmlFor="password">Mot de passe: </label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={handleLogs}
        required
      ></input>
      {state === "login" ? (
        <input
          type="submit"
          value="Login"
          id="submit"
          onClick={sendLogin}
        ></input>
      ) : (
        <input
          type="submit"
          value="Signup"
          id="submit"
          onClick={sendSignup}
        ></input>
      )}
    </form>
  );
}

export default Form;
