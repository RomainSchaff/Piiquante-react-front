import "./likes.css";

function Likes({
  liked,
  setLiked,
  setDisliked,
  disliked,
  likes,
  setLikes,
  dislikes,
  setDislikes,
  sauceId,
  userId,
}) {
  async function handleLike() {
    const likesCode = liked ? 0 : 1;
    const addCount = liked ? -1 : 1;
    setLikes(likes + addCount);
    const headers = { "Content-Type": "application/json" };
    const body = { like: likesCode, userId: userId };
    await fetch(`http://localhost:3000/api/sauces/${sauceId}/like`, {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLiked(!liked);
      })
      .catch((err) => console.log(err));
  }

  async function handleDislike() {
    const dislikesCode = disliked ? 0 : -1;
    const addCount = disliked ? -1 : 1;
    setDislikes(dislikes + addCount);
    console.log(dislikes);
    const headers = { "Content-Type": "application/json" };
    const body = { like: dislikesCode, userId: userId };
    await fetch(
      `https://piiquante-back.onrender.com/api/sauces/${sauceId}/like`,
      {
        headers,
        method: "POST",
        body: JSON.stringify(body),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDisliked(!disliked);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {liked ? (
        <button
          id="like"
          style={{ color: "green", border: "3px solid green" }}
          onClick={handleLike}
        >
          <p>{likes}</p>
          <i className="fa-solid fa-thumbs-up"></i>
        </button>
      ) : (
        <button id="like" onClick={handleLike} disabled={disliked}>
          <p>{likes}</p>
          <i className="fa-solid fa-thumbs-up"></i>
        </button>
      )}
      {disliked ? (
        <button
          id="dislike"
          style={{ color: "red", border: "3px solid red" }}
          onClick={handleDislike}
        >
          <p>{dislikes}</p>
          <i className="fa-solid fa-thumbs-down"></i>
        </button>
      ) : (
        <button id="dislike" onClick={handleDislike} disabled={liked}>
          <p>{dislikes}</p>
          <i className="fa-solid fa-thumbs-down"></i>
        </button>
      )}
    </div>
  );
}

export default Likes;
