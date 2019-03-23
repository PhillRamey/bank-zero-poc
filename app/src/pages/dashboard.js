import React from "react";
import { Redirect } from "react-router-dom";

import { AuthConsumer } from "../authContext";
//import Can from "../components/Can";
import Logout from "../components/Logout";

const DashboardPage = () => (
  <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <div>
            <h1>Dashboard<br/>
              <small class="text-muted">Welcome to your Bank Zero account.</small>
            </h1>
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  </AuthConsumer>

  /*  <AuthConsumer>
    {({ user }) => (
      <Can
        role={user.role}
        perform="dashboard-page:visit"
        yes={() => (
          <div>
            <h1>Dashboard</h1>
            <Logout />
          </div>
       )}
        no={() => <Redirect to="/" />}
      />
    )}
  </AuthConsumer>*/
);

export default DashboardPage;