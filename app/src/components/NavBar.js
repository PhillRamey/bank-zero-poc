import React from 'react';
import {Link} from 'react-router-dom';
import Login from "../components/Login";
import Logout from "../components/Logout";
import NavItems from "../components/NavItems";
import { AuthConsumer } from "../authContext";

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Bank Zero PoC
      </Link>
      <AuthConsumer>
      {({ authenticated, user }) =>
        authenticated ? (
          <div className="navbar">
            <NavItems />
            <Logout />
          </div>
        ) : (
          <Login />
        )
      }
      </AuthConsumer>
    </nav>
    
  );
}

export default NavBar;