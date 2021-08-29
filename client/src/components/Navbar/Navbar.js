import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';
import Header from '../Header/Header';

const Navbar = (props) => {
  return (
    <nav className="main-container">
      <a href="/">~/Expense/</a>

      <ul className="nav">
        {props.token ?
          <>
            <li>
              <NavLink className="nav-link" exact to="/">
                <Header title="Home" />
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" exact to="/Category">
                <Header title="Category" />
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
                <Header title="Home" />
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" exact to="/auth">
                <Header title="SignUp" />
              </NavLink>
            </li>
          </>
        }
      </ul>
    </nav>
  )
}

export default Navbar;