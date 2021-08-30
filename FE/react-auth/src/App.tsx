/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://lmsg03.azurewebsites.net/api/authenticate/user',{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                
                const content = await response.json();
    
                setName(content.userName)
        }    
        )();
    });

  return (
    <div className="App">
      <BrowserRouter>
      <Nav name={name} setName={setName}/>
      <main className="form-signin">
        
          <Route path="/" exact component={() => <Home name={name}/>}/>
          <Route path="/login" component={() => <Login setName={setName}/>}/>
          <Route path="/register" component={Register}/>
       
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
