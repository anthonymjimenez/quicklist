import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import LandingPage from "./LandingPage";
import { ItemProvider } from "./context/Items/ItemContext";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <ItemProvider>
        <App />
      </ItemProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);
