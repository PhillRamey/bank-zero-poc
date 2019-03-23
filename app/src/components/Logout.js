import React from "react";

import { AuthConsumer } from "../authContext";

const Logout = () => (
  <AuthConsumer>
    {({ logout }) => (
      <button className="btn btn-secondary" onClick={logout}>
        Logout
      </button>
    )}
  </AuthConsumer>
);

export default Logout;