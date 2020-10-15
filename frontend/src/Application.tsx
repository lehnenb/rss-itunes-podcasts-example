import * as React from "react";
import { Provider } from "react-redux";
import { ApplicationStore } from "./store";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import "./Application.scss";

export const Application: React.FunctionComponent = () => {
  return (
    <Provider store={ ApplicationStore }>
    </Provider>
  );
};
