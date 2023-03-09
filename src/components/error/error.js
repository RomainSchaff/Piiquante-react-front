import { Link } from "react-router-dom";
import "./error";

function Error() {
  return (
    <div>
      Il y a une erreur dans l'url de navigation <Link to="/">clickez ici</Link>{" "}
      pour revenir à la l'accueil{" "}
    </div>
  );
}

export default Error;
