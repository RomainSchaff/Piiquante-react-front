import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home, { saucesLoader } from "./components/home/home";
import Form from "./components/form/form";
import Card from "./components/card/card";
import Addcard from "./components/addcard/addcard";
import Error from "./components/error/error";
import Menu from "./components/nav/menu/menu";
import Log from "./components/nav/log/log";
import flame from "./assets/flame.png";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "./components/Context/context.jsx";
import PrivateRoutes from "./PrivateRoutes";

// Configure nested routes with JSX
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/Piiquante-react-front/"
      basename="https://romainschaff.github.io/Piiquante-react-front"
      element={<Root />}
    >
      <Route index element={<Form state="login" />} />
      <Route
        path="/Piiquante-react-front/signup"
        element={<Form state="signup" />}
      />
      <Route path="/Piiquante-react-front/*" element={<Error />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/Piiquante-react-front/sauce/:id" element={<Card />} />
        <Route
          path="/Piiquante-react-front/add-a-sauce"
          element={<Addcard />}
          exact
        />
        <Route
          path="/Piiquante-react-front/reviews"
          element={<Home />}
          loader={saucesLoader}
          exact
        />
      </Route>
    </Route>
  )
);

function Router() {
  return <RouterProvider router={router} />;
}

function Root() {
  const { userToken } = useContext(TokenContext);
  const token = userToken.token !== "0" ? true : false;

  return (
    <>
      <nav>
        <Menu userLogedIn={token} />
        <div id="title">
          <img src={flame} alt="flame-noir" />
          <div>
            <h1>HOT TAKES</h1>
            <h2>THE WEB'S BEST HOT SAUCE REVIEWS</h2>
          </div>
        </div>
        <Log userLogedIn={token} />
      </nav>

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Router;
