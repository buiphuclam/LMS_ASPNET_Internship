/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppBar, Toolbar, Grid, Card, CardContent } from '@material-ui/core';
import './App.css';
import Nav from './components/Nav';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Profile_Edit from './Pages/Profile_Edit';
import Drawer_Admin from './Pages/Drawer_Admin';
import Change_Password from './Pages/Change_Password';
import AddCourse from './Pages/Manage/AddCourse';
import ForgotPass from './ForgotPass/ForgotPass';
import ResetPassword from './ForgotPass/ResetPassword';
import Details from './Pages/Details';



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

      <main >
        <Route path="/" exact component={() => <Home name={name}/>}/>
        <Route path="/addcourse" component={AddCourse}/>

        <Route path="/profile" component={() => <Profile/>}/>
        <Route path="/profile_edit" component={() => <Profile_Edit setName={setName}/>}/>

        <Route path="/change_password" component={() => <Change_Password setName={setName}/>}/>

        <Route path="/admin" component={() => <Drawer_Admin/>}/>

        <Route path="/login" component={() => <Login setName={setName}/>}/>

        <Route path="/register" component={Register}/>
        
        <Route path="/forgotpass" component={ForgotPass}/>

        <Route path="/resetpassword" component={ResetPassword}/>

        <Route path="/details" component={Details}/>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
