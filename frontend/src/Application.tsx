import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Home from './containers/Home';

import "./Application.scss";

const Application: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Application;
