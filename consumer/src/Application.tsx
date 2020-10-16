import React, { memo } from "react";
import { Layout } from 'antd';
import { Switch, Route } from "react-router-dom";

import Home from './containers/Home';
import Header from './components/Header';
import Footer from './components/Footer';

import "./Application.scss";


const Application: React.FunctionComponent = () => {
  return (
    <Layout className="container">
      <Header />
      <Layout.Content>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout.Content>
      <Footer/>
    </Layout>
  );
};

export default memo(Application);
