import "./admin.css";
import { useNavigate } from "react-router-dom";

function Admin({ userToken, sauceUserId, sauceId }) {
  const admin = userToken.userId ? userToken.userId === sauceUserId : false;
  const navigate = useNavigate();

  async function deleteSauce() {
    const headers = { "Content-Type": "application/json" };
    await fetch(`http://localhost:3000/api/sauces/${sauceId}`, {
      method: "DELETE",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("delete");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  function modifySauce() {
    console.log("Lol");
    navigate("/");
  }

  return (
    <>
      {admin ? (
        <>
          <button id="delete" onClick={deleteSauce}>
            Supprimer
          </button>
          <button id="modify" onClick={modifySauce}>
            Modifier
          </button>
        </>
      ) : null}
    </>
  );
}

export default Admin;
