import React, {SyntheticEvent, useState} from "react";
import { Redirect } from "react-router-dom";
import MetaTags from 'react-meta-tags';
import { Col, Container, Row, Card } from "reactstrap"


import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { loginUser, apiError } from "../../store/actions"


// import images
import bg from "../../assets/images/bg.jpg";
import logoDark from "../../assets/images/logo-dark.png";

const Login2 = props => {
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
      if(content.message === 'Success!')
      {
        // props.Username(content.data.userName);
        setRedirect(true);
      }
  }

  if(redirect)
  {
    return <Redirect to="/"/>;
  }


  return (
    <React.Fragment>
      <div className="account-pages">
        <MetaTags>
          <title>Login 2 | Veltrix - Responsive Bootstrap 5 Admin Dashboard</title>
        </MetaTags>

          <div
            className="accountbg"
            style={{
              background: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>
          
          <div className="wrapper-page account-page-full">
            <Card className="shadow-none">
              <div className="card-block">
                <div className="account-box">
                  <div className="card-box shadow-none p-4">
                    <div className="p-2">
                      <div className="text-center mt-4">
                        <Link to="/">
                          <img src={logoDark} height="22" alt="logo" />
                        </Link>
                      </div>

                      <h4 className="font-size-18 mt-5 text-center">
                        Welcome Back !
                    </h4>
                      <p className="text-muted text-center">
                        Sign in to continue to Veltrix.
                    </p>

                      <form className="mt-4" action="#" onSubmit={submit}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="username">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            onChange = {e => setUsername(e.target.value)}
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label" htmlFor="userpassword">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="userpassword"
                            placeholder="Enter password"
                            onChange = {e => setPassword(e.target.value)}
                          />
                        </div>

                        <Row className="mb-3">
                          <Col sm="12" className="text-center">
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Log In
                          </button>
                          </Col>
                        </Row>

                        <Row className="mb-3 mt-2 mb-0">
                          <div className="col-12 mt-3">
                            <Link to="pages-recoverpw-2">
                              <i className="mdi mdi-lock"></i> Forgot your
                            password?
                          </Link>
                          </div>
                        </Row>
                      </form>

                      <div className="mt-5 pt-4 text-center">
                        <p>
                          Don't have an account ?{" "}
                          <Link
                            to="pages-register-2"
                            className="fw-medium-medium text-primary"
                          >
                            {" "}
                          Signup now{" "}
                          </Link>{" "}
                        </p>
                        <p>
                          © {new Date().getFullYear()} Veltrix. Crafted with{" "}
                          <i className="mdi mdi-heart text-danger"></i> by
                        Themesbrand
                      </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>


      </div>
    </React.Fragment>
  )
}


export default Login2;

// Login2.propTypes = {
//   Username: PropTypes.any,
// }
