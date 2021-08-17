/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props: {name:string, setName: (name:string) => void}) => {
    const logout = async () => {
        await fetch('http://localhost:39894/api/authenticate/logout',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        props.setName('');
    }

    let menu;

    if(props.name === '' || props.name === undefined) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="/login" className="nav-link active">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link active">Register</Link>
              </li>
          
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="/login" className="nav-link active" onClick={logout}>Logout</Link>
              </li>
            </ul>
        )
    }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Home</Link>
          
          <div>
                {menu}
          </div>
        </div>
      </nav>
    );
};

export default Nav;