import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { TokenContext } from "../Context/context.jsx";
import Admin from "./admin/admin.jsx";
import "./card.css";
import Likes from "./likes/likes.jsx";

function Card() {
  const { userToken } = useContext(TokenContext);
  const [sauce, setSauce] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  let { id } = useParams();

  async function getSauce() {
    const headers = { "Content-Type": "application/json" };
    await fetch(`https://piiquante-back.onrender.com/api/sauces/${id}`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setSauce(data);
        setLikesCount(data.likes);
        setDislikesCount(data.dislikes);
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
          <Likes
            liked={liked}
            setLiked={setLiked}
            disliked={disliked}
            setDisliked={setDisliked}
            likes={likesCount}
            setLikes={setLikesCount}
            dislikes={dislikesCount}
            setDislikes={setDislikesCount}
            sauceId={sauce._id}
            userId={userToken.userId}
          />
          <div id="admin-container">
            <Link to="/Piiquante-react-front/reviews" id="back">
              <i className="fa-solid fa-left-long"></i>
            </Link>
            <Admin
              userToken={userToken}
              sauceUserId={sauce.userId}
              sauceId={sauce._id}
            />
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default Card;
