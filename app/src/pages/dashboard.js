import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
import NoAccessPanel from "../components/NoAccessPanel.js";

const DashboardPage = () => (
  <div className="container">
      <h1>Dashboard<br/>
      <small className="text-muted">Welcome to your Bank Zero account.</small>
      </h1>
      <AuthConsumer>
        {({ authenticated, user, accessToken }) =>
          // If user not signed in, redirect so that they have to sign in
          !authenticated ? (<Redirect to="/" />) : 
          (
            // If user can't read customers, show them no access
            !user.permissions.includes('read:customers') ? (
              <NoAccessPanel key='noaccess' permissions={user.permissions} />
            ) :
            // Else show them the general content
            (
              <p>Use the navigation links to view customer and/or employee records. Only managers have access to view employee records.</p>
            )
          )
        }
      </AuthConsumer>
      
    </div>
  
  
);

export default DashboardPage;