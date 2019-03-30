import React from 'react';
import {Link} from 'react-router-dom';
import { AuthConsumer } from "../authContext";

function NavItems() {
  return (
      
        <AuthConsumer>
        {({ user }) =>
          user.permissions.includes('read:employees') ? (
            <ul className="navbar-nav navbar-expand">
              <li className="nav-item">
                <Link className="nav-link" to="/customers">
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employees">
                  Employees
                </Link>
              </li>
            </ul>
          ) : 
          (
            user.permissions.includes('read:customers') ? (
            <ul className="navbar-nav navbar-expand">
              <li className="nav-item">
                <Link className="nav-link" to="/customers">
                  Customers
                </Link>
              </li>
            </ul>
          ) : '' )
        }
        </AuthConsumer>
      
  );
}

export default NavItems;