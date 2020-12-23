import { Link } from 'react-router-dom';
import React from 'react';

const Header = ({ username, isLoggedIn, onLogout }) => (
    <nav className="navbar navbar-dark bg-dark">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <div className="d-flex align-items-center">
                    <i className="fas fa-book fa-2x"></i>
                    <span className="h4 pl-2 d-none d-md-block">PersonalNotes</span>
                    <span className="h4 pl-2 d-md-none">PN</span>
                </div>
            </Link>
            {
                isLoggedIn &&
                <h4 className="ml-auto mr-4">
                    <span className="badge badge-pill badge-secondary text-capitalize d-none d-lg-block">Welcome {username} !</span>
                    <span className="badge badge-pill badge-secondary text-capitalize d-md-none">{username} !</span>
                </h4>
            }
            {isLoggedIn &&
                <button type="button" onClick={onLogout} className="btn btn-outline-warning">
                    Logout | <i className="fas fa-sign-out-alt"></i>
                </button>
            }
        </div>
    </nav>
);

export default Header;