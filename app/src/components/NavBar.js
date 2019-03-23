import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand" to="/">
        Bank Zero PoC
      </Link>
    </nav>
  );
}

export default NavBar;