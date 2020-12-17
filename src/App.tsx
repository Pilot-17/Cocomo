import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";
import { About, Cocomo, NoResult } from "pages";
import { Nav } from "./components/Nav";
import { CocomoBasic } from "pages/CocomoBasic";
import { Cocomo2 } from "pages/Cocomo2";
import { Cocomo2Advance } from "pages/Cocomo2Advance";

export const App = () => (
  // <HashRouter basename={process.env.PUBLIC_URL}>
    <HashRouter >
    <Nav />
    <Switch>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/calc1">
        <CocomoBasic />
      </Route>
      <Route exact path="/calc2">
        <Cocomo />
      </Route>
      <Route exact path="/calc3">
        <Cocomo2 />
      </Route>
      <Route exact path="/calc4">
        <Cocomo2Advance />
      </Route>
      {/* <Route path="*">
        <NoResult />
      </Route> */}
    </Switch>
    </HashRouter>
);
