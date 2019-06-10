//HOC - High order component
//Reuse code
//render hijacking
//prop manipluation
//abstract state

import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

//HOC - High order component
const withAdminWarning = WrappedComponent => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share!</p>}
    </div>
  );
};

//HOC - High order component
// requireAuthernitaction
const requireAuthentication = WrappedComponent => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <div>
          <p>You are logged in!</p>
          <WrappedComponent {...props} />
        </div>
      ) : (
        <p>please log in to view</p>
      )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="There are the details" />,
  document.getElementById("app")
);
