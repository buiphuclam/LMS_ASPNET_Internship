import React, {useState} from 'react'
import Cookies from 'js-cookie'
import { Redirect,Link } from "react-router-dom";
import { Card, Container,CardBody,Row } from 'reactstrap'
import './Login.css'
import img2 from '../../assets/images/bg.jpg'


export default function Login(props) {
    const {setName } = props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    

    const submit = async (e) => {
        e.preventDefault();
  
        const response = await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        });
  
        const content = await response.json();
        console.log(content.message)
        
        let jwt = Cookies.get('jwt_r')
        console.log(jwt)
        // const content = await response.json();
        if(content.message === 'Success!')
        {
            
            setRedirect(true);
            setName(username);
            
            
        }
    }
  
    const handleUserNameChange = (e) =>{
        setUsername(e.target.value);
    }
    const handlePassChange = (e) =>{
        setPassword(e.target.value);
    }
    if(redirect)
      return <Redirect to="/"/>;

    return (
    
<>  
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"></link>


    <div className="d-flex align-items-center min-vh-100 py-3 py-md-0">
        <div className="container">
            <div className="card login-card">
              <div className="row no-gutters">
                <div className="col-md-5">
                  <img style={{padding: '5px', width: '470px'}} src={img2} alt="login" className="login-card-img" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <p className="login-card-description">Đăng Nhập</p>

                    <form method="post" onSubmit={submit}>
                      <div className="form-group">
                        <label htmlFor="user" className="sr-only">Tài khoản</label>
                        <input 
                        value={username}
                        type="text" 
                        name="username" 
                        className="form-control" 
                        placeholder="Your Account"
                        onChange={handleUserNameChange}
                         />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="pass" className="sr-only">Password</label>
                        <input
                        value={password}
                        type="password" 
                        name="password"  
                        className="form-control" 
                        data-type="password" 
                        placeholder="***********"
                        onChange={handlePassChange}
                        />
                      </div>
                      <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" defaultValue="Login" />
                    </form>
                    <Link to="#!" className="forgot-password-link">Forgot password?</Link>
                    <p className="login-card-footer-text">Don't have an account? <Link to="/Register" className="text-reset">Register here</Link></p>
                    <Link to="/" className="text-reset">Back to Home!</Link><p />
                    <nav className="login-card-footer-nav">
                      <Link to="#!">Terms of use.</Link>
                      <Link to="#!">Privacy policy</Link>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
        </div>

    </div>
    </>
    )
}
