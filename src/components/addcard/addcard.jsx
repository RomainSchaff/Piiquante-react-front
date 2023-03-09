import { useState } from "react";
import "./addcard.css";

function Addcard() {
  const [heat, setHeat] = useState(1);
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [mainPepper, setMainPepper] = useState("");

  async function sendSauce(e) {
    e.preventDefault();
    const object = {};
    const formDatata = new FormData();
    formDatata.append("userId", "6185dfb56818cff64855106c");
    formDatata.append("name", name);
    formDatata.append("manufacturer", manufacturer);
    formDatata.append("description", description);
    formDatata.append("mainPepper", mainPepper);
    // formDatata.append("file", image);
    formDatata.append("heat", heat);

    for (let [key, value] of formDatata.entries()) {
      console.log(`${key}: ${value}`);
      if (key === "heat") {
        value = Number(value);
      }
      object[key] = value;
      console.log(object);
    }
    const formDataJSON = JSON.stringify(formDatata);
    console.log(formDataJSON);
    console.log(formDatata);
    const object2 = JSON.stringify(object);
    console.log(typeof object2);
    const headers = { "Content-Type": "application/json" };
    await fetch("http://localhost:3000/api/sauces/", {
      headers,
      method: "POST",
      body: object2,
    })
      .then((response) => {
        response.json();
      })
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleHeat(e) {
    setHeat(e.target.value);
  }

  return (
    <form method="post" id="add-card-form">
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
        accept="image/png, image/jpeg"
        id="image"
        name="image"
        onChange={(e) => setImage(e.target.value)}
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
          type="range"
          onInput={handleHeat}
        ></input>
        <output>{heat}</output>
      </div>
      <input
        type="submit"
        value="Envoyer"
        id="send"
        onClick={(e) => sendSauce(e)}
      ></input>
    </form>
  );
}

export default Addcard;
