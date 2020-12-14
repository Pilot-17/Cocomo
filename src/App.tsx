import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { About, Cocomo, NoResult } from "pages";
import { Nav } from "./components/Nav";
import { CocomoBasic } from "pages/CocomoBasic";
import { Cocomo2 } from "pages/Cocomo2";

export const App = () => (
  <Router>
    <Nav />
    <Switch>
      <Route exact path="/">
        <About />
      </Route>
      <Route exact path="/calcbasic">
        <CocomoBasic />
      </Route>
      <Route exact path="/calc">
        <Cocomo />
      </Route>
      <Route exact path="/calc3">
        <Cocomo2 />
      </Route>
      <Route path="*">
        <NoResult />
      </Route>
    </Switch>
  </Router>
);
