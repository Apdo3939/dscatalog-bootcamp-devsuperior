import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './styles.scss';

const NavBar = () => {

    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();

    useEffect(() =>{
       const currentUserData = getAccessTokenDecoded();
       setCurrentUser(currentUserData.user_name);
    }, [location]);
    
    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        logout();
    }

    return (
        <nav className="row bg-primary main-nav">
            <div className="col-3">
                <Link to="/" className="nav-logo-text">
                    <h4>Ds Catalog</h4>
                </Link>
            </div>
            <div className="col-6">
                <ul className="main-menu" >
                    <li>
                        <NavLink to="/" exact activeClassName="active" className="main-login">HOME</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" activeClassName="active" className="main-login">CATALOGO</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin" activeClassName="active" className="main-login">ADMIN</NavLink>
                    </li>
                </ul>
            </div>
            <div className="col-3 text-right">
                {currentUser && (
                    <>
                        {currentUser}
                        <a href="#logout"
                            className="main-login active d-inline ml-5"
                            onClick={handleLogout}>
                            logout
                        </a>
                    </>
                )}

                {!currentUser && (
                    <Link
                        to="/auth/login"
                        className="main-login active">
                        login
                    </Link>

                )}
            </div>
        </nav>
    );
}

export default NavBar;