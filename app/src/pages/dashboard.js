import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import CustomerPanel from "../components/CustomerPanel.js";

const DashboardPage = () => (
  <AuthConsumer>
    {({ authenticated, user }) =>
      authenticated ? (
        <div className="container">
            <h1>Dashboard<br/>
              <small className="text-muted">Welcome to your Bank Zero account.</small>
            </h1>
            <CustomerPanel permissions={user.permissions} />
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.permissions}</p>
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  </AuthConsumer>
);

export default DashboardPage;