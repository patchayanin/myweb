import React from "react";
import { Route, Switch } from "react-router-dom";
// import { render } from 'react-dom'
// import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import Home from "./containers/Home";
import Product from "./containers/Product";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import ProtectedRoute from "./components/ProtectedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <ProtectedRoute path='/product' component={Product} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
   { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
