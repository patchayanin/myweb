import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from 'react-router';

// export default ({ component: C, props: cProps, ...rest }) =>
//   <Route {...rest} render={props => <C {...props} {...cProps} />} />;
export default ({ component: C, props: cProps, ...rest }) =>
  <Route {...rest} render={(props) => (
    cProps.isAuthenticated
      ? <C {...props} {...cProps}/>
      : <Redirect to="/Login"/>
  )} />