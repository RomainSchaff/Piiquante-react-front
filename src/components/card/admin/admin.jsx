import "./admin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Addcard from "../../addcard/addcard";

function Admin({ userToken, sauceUserId, sauceId }) {
  const admin = userToken.userId ? userToken.userId === sauceUserId : false;
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();

  async function deleteSauce() {
    const headers = { "Content-Type": "application/json" };
    await fetch(`https://piiquante-back.onrender.com/api/sauces/${sauceId}`, {
      method: "DELETE",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("delete");
        navigate("/Piiquante-react-front/reviews");
      })
      .catch((err) => console.log(err));
  }

  function modifySauce() {
    setOpenForm(!openForm);
  }

  return (
    <>
      {admin ? (
        <>
          {!openForm ? (
            <button id="modify" onClick={modifySauce}>
              <i className="fa-solid fa-arrow-rotate-left"></i>
            </button>
          ) : (
            <>
              <button id="close" onClick={modifySauce}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <Addcard sauceId={sauceId} />
            </>
          )}
          <button id="delete" onClick={deleteSauce}>
            <i className="fa-solid fa-ban"></i>
          </button>
        </>
      ) : null}
    </>
  );
}

export default Admin;
