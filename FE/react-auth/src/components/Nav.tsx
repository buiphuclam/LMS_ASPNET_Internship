/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import './dskh.css';
import './style.css';

import { AppBar, Toolbar, Grid, Card, CardContent } from '@material-ui/core';

const Nav = (props: {name:string, setName: (name:string) => void}) => {
    const logout = async () => {
        await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/logout',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        props.setName('');
    }

    let menu;

    if(props.name === '' || props.name === undefined) {
        menu = (

      <nav className="nav-position">
          <div className="nav">
            <div className="nav-btn btn">
              <img src="https://lmstelecomgroup.com/wp-content/uploads/2019/04/LMS-Rotating-Globe-Logo.gif" alt="" height="55px" width="75px"></img>
              <div className="nav-btn btn">
              <a href="/" className="nav-font btn">Trang Chủ</a>
              <a href="/admin" className="nav-font btn">Admin</a>
              </div>
            </div>

            <div className="nav-btn btn">
              <a href="/login" className="nav-font btn">Đăng Nhập</a>
              <a href="/register" className="nav-font btn">Đăng Ký</a>

              {/* <a href="/Profile" className="nav-font btn">Profile</a> */}
            </div>
          </div>
      </nav>
          // <Grid item container justify="flex-start">
          //   <ul className="navbar-nav me-auto mb-2 mb-md-0">
          //   <Grid item xs={12}>
          //     <li className="nav-item">
          //       <Link to="/login" className="nav-link active">Login</Link>
          //     </li>
          //     </Grid>
          //     <Grid item xs={12}>
          //     <li className="nav-item">
          //       <Link to="/register" className="nav-link active">Register</Link>
          //     </li>
          //     </Grid>
          //     <Grid item xs={12}>
          //     <li className="nav-item">
          //       <Link to="/profile" className="nav-link active">Profile</Link>
          //     </li>
          //     </Grid>
          //   </ul>
          // </Grid>
        )
    } else {
        menu = (

          <nav className="nav-position">
          <div className="nav">
            <div className="nav-btn btn">
              <img src="https://lmstelecomgroup.com/wp-content/uploads/2019/04/LMS-Rotating-Globe-Logo.gif" alt="" height="55px" width="75px"></img>
              <div className="nav-btn btn">
              <a href="/" className="nav-font btn">Trang Chủ</a>
              <a href="/admin" className="nav-font btn">Admin</a>
              </div>
            </div>
            <div className="nav-btn btn">
              <a href="/Profile" className="nav-font btn">Profile</a>
              <Link to="/login" className="nav-font btn" onClick={logout}>Logout</Link>
              <a>Hi {props.name}</a>
            </div>
          </div>
      </nav>
        )
    }
    return (
        // <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        // <div className="container-fluid">
        //   <Grid item xs={12} sm={6}>
        //   <div className="logo"><img src="https://lmstelecomgroup.com/wp-content/uploads/2019/04/LMS-Rotating-Globe-Logo.gif" alt="" height="55px" width="75px"></img><Link to="/" className="navbar-brand">Home</Link></div>
        //   </Grid>
        
          <div className="fixed-top-nav">
                {menu}
          </div>
      //   </div>
      // </nav>
    );
};

export default Nav;