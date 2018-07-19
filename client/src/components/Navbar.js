import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Signout from './Auth/Signout';

const Navbar = ({ session }) => (
    <nav>
        {session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}
    </nav>
);

const NavbarUnAuth = () => (
    <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/signin">Signin</NavLink></li>
        <li><NavLink to="/signup">Signup</NavLink></li>
    </ul>
);

const NavbarAuth = ({ session }) => (
    <Fragment>
        <ul>
            <li><NavLink to="/" exact>Home</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><NavLink to="/promotions">Promotions</NavLink></li>
            <Signout />
        </ul>
        <h4>Welcome, {session.getCurrentUser.fullname}</h4>
    </Fragment>
);

export default Navbar;