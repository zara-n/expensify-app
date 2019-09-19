import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expenses</h1>
      <p>Keept track of your money and get your expenses in order</p>
      <button className="button" onClick={startLogin}>Login with Google</button>
    </div>
  </div>
);

//not dealing with states (so no mapStateToProps) but we still want to dispatch something
const mapDispatchToProps = dispatch => ({
  //implicitly returning object
  startLogin: () => dispatch(startLogin())
});

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);
