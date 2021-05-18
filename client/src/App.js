import React, { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ItemContext } from "./context/Items/ItemContext";
import "./App.css";
import NavBar from "./components/nav-bar";
import Loading from "./components/loading";
import Footer from "./components/footer";
import { Home, Profile, Create, Category, Categories, Item } from "./views";
import ProtectedRoute from "./auth/protected-route";

const App = () => {
  const { isLoading, user = null } = useAuth0();
  const { getCategories, getItems, categories, items } =
    useContext(ItemContext);

  useEffect(() => {
    if (user) {
      getItems(user.sub);
      getCategories(user.sub);
    }
    console.log("PING", categories, items);
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
          <ProtectedRoute path="/create" component={Create} />
          <ProtectedRoute path="/categories" component={Categories} />
          <ProtectedRoute path="/category/:id" component={Category} />
          <ProtectedRoute path="/item/:id" component={Item} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
