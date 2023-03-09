import "./addcard.css";
import { useContext, useState } from "react";
import { useNavigate, useHref } from "react-router-dom";
import { TokenContext } from "../Context/context";

function Addcard({ sauceId }) {
  const { userToken } = useContext(TokenContext);
  const [heat, setHeat] = useState(1);
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [mainPepper, setMainPepper] = useState("");
  const navigate = useNavigate();
  const urlHref = useHref();

  async function sendSauce(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", userToken.userId);
    formData.append("name", name);
    formData.append("manufacturer", manufacturer);
    formData.append("description", description);
    formData.append("mainPepper", mainPepper);
    formData.append("image", file);
    formData.append("heat", heat);

    await fetch("http://localhost:3000/api/sauces/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response.json();
        navigate("/Piiquante-react-front/reviews");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function modifySauce(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", userToken.userId);
    formData.append("name", name);
    formData.append("manufacturer", manufacturer);
    formData.append("description", description);
    formData.append("mainPepper", mainPepper);
    formData.append("image", file);
    formData.append("heat", heat);

    await fetch(`http://localhost:3000/api/sauces/${sauceId}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        response.json();
        navigate(`/Piiquante-react-front/reviews`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleHeat(e) {
    setHeat(e.target.value);
  }

  return (
    <form
      id={sauceId ? "modify-card-form" : "add-card-form"}
      onSubmit={(e) => (sauceId ? modifySauce(e) : sendSauce(e))}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setName(e.target.value)}
        required
      ></input>
      <label htmlFor="manufacturer">Manufacturer</label>
      <input
        type="text"
        name="manufacturer"
        id="manufacturer"
        onChange={(e) => setManufacturer(e.target.value)}
        required
      ></input>
      <label htmlFor="description">Description</label>
      <textarea
        row="5"
        col="33"
        name="description"
        id="description"
        style={{ minHeight: "157px" }}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <label htmlFor="image">Choisissez une image</label>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .webp"
        id="image"
        name="file"
        onChange={(e) => setFile(e.target.files[0])}
      ></input>
      <label htmlFor="pepper">Main Pepper Ingredient</label>
      <input
        type="text"
        name="pepper"
        id="pepper"
        onChange={(e) => setMainPepper(e.target.value)}
        required
      ></input>
      <label htmlFor="heat">Heat</label>
      <div id="form-heat">
        <input
          name="heat"
          id="heat"
          max="10"
          min="1"
          defaultValue="1"
          type="range"
          onInput={handleHeat}
        ></input>
        <output>{heat}</output>
      </div>
      {urlHref === "/Piiquante-react-front/add-a-sauce" ? (
        <input type="submit" value="Envoyer" id="send"></input>
      ) : (
        <input type="submit" value="Confirm" id="confirm"></input>
      )}
    </form>
  );
}

export default Addcard;
