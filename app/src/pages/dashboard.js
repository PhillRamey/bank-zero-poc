import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import DashboardContent from "../components/DashboardContent.js";

const DashboardPage = () => (
  <AuthConsumer>
    {({ authenticated, user, accessToken }) =>
      !authenticated ? (<Redirect to="/" />) : <DashboardContent permissions={user.permissions} accessToken={accessToken} />
    }
  </AuthConsumer>
);

export default DashboardPage;