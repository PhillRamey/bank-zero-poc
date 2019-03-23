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
        <div className="jumbotron">
          <ErrorPanel message={errorDescription}/>
          <h1 className="display-4">Welcome to Bank Zero!</h1>
          <p className="lead">This is a simple proof of concept to demonstrate how Bank Zero can modernize its consumer identity platform.</p>
          <hr className="my-4" />
          <p>To get started, just log in.</p>
          <Login/>
        </div>
      )
    }
  </AuthConsumer>
);

export default HomePage;