/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppBar, Toolbar, Grid, Card, CardContent } from '@material-ui/core';
import './App.css';
import './Pages/Login-Signin.css';
import Nav from './components/Nav';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Profile_Edit from './Pages/Profile_Edit';
import Change_Password from './Pages/Change_Password';
import AddCourse from './Pages/Manage/AddCourse';
import ForgotPass from './ForgotPass/ForgotPass';
import ResetPassword from './ForgotPass/ResetPassword';
import Details from './Pages/Details';
import Drawer_Admin from './Pages/System_Admin/Drawer_Admin';



function App() {
  const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/user',{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                
                const content = await response.json();
    
                if(content.message ==='Success!')
                  setName(content.data.userName)
        }    
        )();
    });

    
  return (
    <div className="App">
      <BrowserRouter>
      <Nav name={name} setName={setName}/>

      <main className="form-home">
        <Route path="/" exact component={() => <Home name={name}/>}/>
        <Route path="/addcourse" component={AddCourse}/>
        <Route path="/details" component={Details}/>
      </main>
      <main className="form-profile" >
        <Route path="/profile" component={() => <Profile/>}/>
        <Route path="/profile_edit" component={() => <Profile_Edit setName={setName}/>}/>
        
      </main>
      <main className="form-change_pass">
        <Route path="/change_password" component={() => <Change_Password setName={setName}/>}/>
      </main>

      <main className="form-admin">
      <Route path="/admin" component={() => <Drawer_Admin/>}/>
      </main>

      <main className="form-lognin">
          <Route path="/login" component={() => <Login setName={setName}/>}/>
      </main>
      <main className="form-signin">
          <Route path="/register" component={Register}/>
      </main>
      <main className="form-signin">
          <Route path="/forgotpass" component={ForgotPass}/>
      </main>
      <main className="form-signin">
          <Route path="/resetpassword" component={ResetPassword}/>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
