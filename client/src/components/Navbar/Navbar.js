import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';
import Header from '../Header/Header';

const Navbar = (props) => {
  return (
    <nav className="main-container">
      <a href="/">~/Expense/</a>

      <ul className="nav">
        {props.isauth ?
          <>
            <li>
              <NavLink className="nav-link" exact to="/">
                <Header title="SignUp" />
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" exact to="/Logout">
                <Header title="Logout" />
              </NavLink>
            </li>
          </>
          :
          <>
            <li>
              <NavLink className="nav-link" exact to="/">
                <Header title="SignUp" />
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" exact to="/Category">
                <Header title="Category" />
              </NavLink>
            </li>
          </>
        }
      </ul>
    </nav>
  )
}

export default Navbar;