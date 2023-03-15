import { Link, useLoaderData } from "react-router-dom";
import "./home.css";

export async function saucesLoader() {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch("https://piiquante-back.onrender.com/api/sauces", {
    headers,
  });
  const data = await res.json();
  return data;
}

function Home() {
  const sauces = useLoaderData();

  return (
    <>
      <h3>The Sauces</h3>
      <div id="grille">
        {sauces.map((sauce, index) => (
          <figure key={index}>
            <Link
              to={`/Piiquante-react-front/sauce/${sauce._id}`}
              key={index + "L"}
            >
              <img src={sauce.imageUrl} alt={sauce.name} />
              <figcaption>
                <p key={sauce.name} className="sauce-name">
                  {sauce.name}
                </p>
                <p key={sauce.heat} className="sauce-heat">
                  <i class="fa-solid fa-pepper-hot"></i> {sauce.heat}
                </p>
              </figcaption>
            </Link>
          </figure>
        ))}
      </div>
    </>
  );
}

export default Home;
