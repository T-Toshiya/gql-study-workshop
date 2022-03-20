import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import Products from "./components/Products";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4010/graphql",
  });

  return (
    <ApolloProvider client={client}>
      {" "}
      <HashRouter>
        <Switch>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/products/:productId">
            <ProductDetail />
          </Route>
          <Route>
            <Redirect to="/products" />
          </Route>
        </Switch>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
