import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import NavBar from "./components/nav-bar";
import Loading from "./components/loading";
import Footer from "./components/footer";
import { Home, Profile, Items, Category } from "./views";
import ProtectedRoute from "./auth/protected-route";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/items" component={Items} />
          <ProtectedRoute path="/category" component={Category} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
