import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import Login from "../components/Login";
import ErrorPanel from "../components/ErrorPanel";

let queryParams = new URLSearchParams(window.location.search);
let errorDescription = queryParams.get('error');

const HomePage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <div>
          <ErrorPanel message={errorDescription}/>
          <h2>Welcome to React RBAC Tutorial.</h2>
          <Login />
        </div>
      )
    }
  </AuthConsumer>
);

export default HomePage;