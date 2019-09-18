import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

//stateless functional component
export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest //will contain the rest of props that aren't destructured
}) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => ({
  //if it exists we are authenticated and vice versa - boolean
  //!! flips it to it's boolean values
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
