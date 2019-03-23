import React from 'react';
import {Link} from 'react-router-dom';
import Login from "../components/Login";
import Logout from "../components/Logout";
import { AuthConsumer } from "../authContext";

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Bank Zero PoC
      </Link>
      <AuthConsumer>
      {({ authenticated }) =>
        authenticated ? (
          <Logout />
        ) : (
          <Login />

        )
      }
      </AuthConsumer>
    </nav>
    
  );
}

export default NavBar;