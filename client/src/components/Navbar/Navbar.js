import React from 'react';
import {Link , NavLink} from 'react-router-dom';
import './Navbar.css';
import Header from '../Header/Header';

const Navbar = (props) => {
    return(
        <div>
            <div className="main-container">
                <div className="logo">
                    <Link className="logo-link" to="/">
                        <Header title="Expense"/>
                    </Link>
                </div>
                {
                    (props.token!=null)
                    ?
                    <>
                        <ul className="nav">
                            <li className="nav-item">
                                <NavLink 
                                    className="item-link" 
                                    exact to="/Category"
                                >
                                    <Header title="Category"/>
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="nav">
                            <li className="nav-item">
                                <NavLink 
                                    className="item-link" 
                                    exact to="/Logout"
                                >
                                    <Header title="Logout"/>
                                </NavLink>
                            </li>
                        </ul>
                    </>
                    :
                    <>
                        <ul className="nav">
                            <li className="nav-item">
                                <NavLink 
                                    className="item-link" 
                                    exact to="/"
                                >
                                    <Header title="SignUp"/>
                                </NavLink>
                            </li>
                        </ul>
                    </>
                }
            </div>
        </div>
    )
}

export default Navbar;