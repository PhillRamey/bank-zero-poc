import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import EmployeeList from "../components/EmployeeList.js";

const EmployeesPage = () => (
  <div className="container">
  <AuthConsumer>
    {({ authenticated, user, accessToken }) =>
      !authenticated ? (<Redirect to="/" />) : <EmployeeList permissions={user.permissions} accessToken={accessToken} />
    }
  </AuthConsumer>
  </div>
);

export default EmployeesPage;