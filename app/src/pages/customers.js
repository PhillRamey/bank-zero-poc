import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import CustomerList from "../components/CustomerList.js";

const CustomersPage = () => (
  <div class="container">
    <AuthConsumer>
      {({ authenticated, user, accessToken }) =>
        !authenticated ? (<Redirect to="/" />) : <CustomerList permissions={user.permissions} accessToken={accessToken} />
      }
    </AuthConsumer>
  </div>
);

export default CustomersPage;