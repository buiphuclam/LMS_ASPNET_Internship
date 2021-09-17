import React from 'react'
import "./style.css"
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Row,Col
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom";
import { autofill } from 'redux-form';
import Dashboard from 'pages/Dashboard/index';

const useStyle = {
  navControl: {
    display: 'flex' ,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonControl: {
    margin: 'auto 10px',
    border: '1px solid black'
  },
  buttonControl1:{
    with: 'auto'
  }
}

export default function Nav(props) {
  const {name, setName, listNav,setIsAuth} = props
  const [anchorEl, setAnchorEl] = React.useState(null);

  const logout = async () => {
    await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/logout',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });

    setName('');
    setIsAuth(false)
  }   

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let { url } = useRouteMatch();
  let menu;

  if(name === '' || name === undefined || name === null) {
      menu = (
        <nav className="nav-position">
          
            <div className="nav" style={{display: 'block'}}>
              <Row>
                <Col sm={6}>
                  
                  <Row>
                    <div className="nav1">
                    <Col sm={3}>
                    <div className="nav-logo">
                      <a href="Home.html"><img src="imgs/logo_kall.png" height="70px" /></a>
                    </div>
                    </Col>
                    
      
                    {/* <Col sm={3}>
                    <button className="nav-button btn"><a href="Home.html">TRANG CHỦ</a></button>
                    </Col>
                    <Col sm={3}>
                    <button className="nav-button btn"><a href="Home.html">CHÚNG TÔI</a></button>
                    </Col>
                    <Col sm={3}>
                    <button className="nav-button btn " ><a href="Home.html">LIÊN HỆ</a></button>
                    </Col> */}
                    </div>
                  </Row>
                  
                  {/* <div className="nav1">
                    
                    
                    <div>
                      <button className="nav-button btn " id="btnkhachhang">KHÁCH HÀNG</button>
                    </div>
                    <div>
                      <button className="nav-button btn"><a href="Home.html">CHÚNG TÔI</a></button>
                    </div>
                    <div>
                      <button className="nav-button btn "><a href="Home.html">LIÊN HỆ</a></button>
                    </div>
                  </div> */}
                </Col>
                <Col sm={6} style={useStyle.navControl} >
                    <Row >
                      <div className="nav1">
                      <Col sm={6} >
                        <button className="nav-button btn" style={useStyle.buttonControl}>
                          <Link to="login">Đăng Nhập</Link>
                          </button>
                      </Col>
                      {/* <Col sm={6}>
                        <button className="nav-button btn" style={useStyle.buttonControl}>
                        <Link to="login">Đăng Ký</Link>
                        </button>
                      </Col> */}
                      </div>
                    </Row>
  
                </Col>
              </Row>
               
            </div>
        </nav>
      )
  } else {
      menu = (
        <nav className="nav-position">
        <div className="nav" style={{display: 'block'}}>
          <Row>
            <Col sm={6}>
              <div className="nav1">
              <Col sm={2}>
                    <div className="nav-logo">
                      <a href="Home.html"><img src="imgs/logo_kall.png" height="70px" /></a>
                    </div>
                </Col>
                {listNav.map((value, i)=>{
                   return <Col sm={2}>
                            <button className="nav-button btn" style={useStyle.buttonControl1}>
                              <Link to={value.path}>{value.name}</Link>
                            </button>
                          </Col>
                   })}
              </div>
            </Col>

              <Col sm={4} className="navName">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  {name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </Col>
            </Row>
            <Switch>
        <Route path={`${url}/:id`}>
          <Dashboard />
        </Route>
      </Switch>
           
        </div>
    </nav>
    )
  }


    return (
      <>
      {menu}
      </>
    )
}
