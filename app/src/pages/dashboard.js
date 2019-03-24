import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import CustomerPanel from "../components/CustomerPanel.js";
import CustomerList from "../components/CustomerList.js";
import EmployeeList from "../components/EmployeeList.js";

const DashboardPage = () => (
  <AuthConsumer>
    {({ authenticated, user, accessToken }) =>
      !authenticated ? (<Redirect to="/" />) : 
        user.permissions.includes("read:employees") ?
          (
            <div className="container">
              <h1>Dashboard<br/>
                <small className="text-muted">Welcome to your Bank Zero account.</small>
              </h1>
              <CustomerList permissions={user.permissions} accessToken={accessToken} />
              <EmployeeList permissions={user.permissions} accessToken={accessToken} />
            </div>
          ) :
          user.permissions.includes("read:customers") ?
            (
              <div className="container">
                <h1>Dashboard<br/>
                  <small className="text-muted">Welcome to your Bank Zero account.</small>
                </h1>
                <CustomerList permissions={user.permissions} accessToken={accessToken} />
              </div>
            ) :
            (
              <div className="container">
                <h1>Dashboard<br/>
                  <small className="text-muted">Welcome to your Bank Zero account.</small>
                </h1>
                <CustomerPanel permissions={user.permissions} />
              </div>
            )
    }
  </AuthConsumer>
);

export default DashboardPage;