import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { TokenContext } from "../Context/context.jsx";
import Admin from "./admin/admin.jsx";
import "./card.css";

function Card() {
  const { userToken } = useContext(TokenContext);
  const [sauce, setSauce] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  let { id } = useParams();

  async function getSauce() {
    const headers = { "Content-Type": "application/json" };
    await fetch(`http://localhost:3000/api/sauces/${id}`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setSauce(data);
        console.log(data);
        for (let i = 0; i < data.usersLiked.length; i++) {
          if (data.usersLiked[i] === userToken.userId) {
            console.log("TROUVER");
            setLiked(true);
          }
        }
        for (let i = 0; i < data.usersDisliked.length; i++) {
          if (data.usersDisliked[i] === userToken.userId) {
            console.log("TROUVER");
            setDisliked(true);
          }
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getSauce();
  }, []);

  return (
    <div>
      <figure id="card">
        <img src={sauce.imageUrl} alt={sauce.name} />
        <figcaption>
          <p id="sauce-name">{sauce.name}</p>
          <p id="sauce-manufacturer">by {sauce.manufacturer}</p>
          <p id="sauce-description-title">Description:</p>
          <p id="sauce-description">{sauce.description}</p>
          <div>
            {liked ? (
              <button
                id="like"
                style={{ color: "green", border: "3px solid green" }}
              >
                {sauce.likes}👍
              </button>
            ) : (
              <button id="like">{sauce.likes}👍</button>
            )}
            {disliked ? (
              <button
                id="dislike"
                style={{ color: "red", border: "3px solid red" }}
              >
                {sauce.dislikes}👎
              </button>
            ) : (
              <button id="dislike">{sauce.dislikes}👎</button>
            )}
          </div>
          <Admin
            userToken={userToken}
            sauceUserId={sauce.userId}
            sauceId={sauce._id}
          />
          <Link to="/reviews" id="back">
            🚪
          </Link>
        </figcaption>
      </figure>
    </div>
  );
}

export default Card;
