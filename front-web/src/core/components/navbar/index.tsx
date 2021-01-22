import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles.scss';

const NavBar = () => (
    <nav className="row bg-primary main-nav">
        <div className="col-2">
            <Link to="/" className="nav-logo-text">
                <h4>Ds Catalog</h4>
            </Link>
        </div>
        <div className="col-6 offset-2">
            <ul className="main-menu" >
                <li>
                    <NavLink to="/" exact activeClassName="active">HOME</NavLink>
                </li>
                <li>
                    <NavLink to="/catalogo" activeClassName="active">CATALOGO</NavLink>
                </li>
                <li>
                    <NavLink to="/admin" activeClassName="active">ADMIN</NavLink>
                </li>
            </ul>
        </div>
    </nav>
);

export default NavBar;