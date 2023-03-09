import React from "react";
import "./App.css";
import { UserTokenProvider } from "./components/Context/context";

import Router from "./Router";

function App() {
  return (
    <UserTokenProvider>
      <Router />
    </UserTokenProvider>
  );
}

export default App;
