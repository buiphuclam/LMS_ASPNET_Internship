import React from 'react'
import "./style.css"
import {
  Row,Col,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,

} from 'reactstrap';
import logo from '../../assets/images/logo-sm.png';
// import '../../assets/images/'



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
  // if(redirect)
  //   return <Redirect to="/" />

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
                      <Link to="/"><img src={logo} height="50px" /></Link>
                    </div>
                    </Col>
                    </div>
                  </Row>
                

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
                    <Link to="/"><img src={logo} height="50px" /></Link>
                    </div>
                </Col>
                {listNav.map((value, i)=>{
                   return <Col sm={3}>
                            <button className="nav-button btn" style={useStyle.buttonControl1}>
                              <Link to={value.path}>{value.name}</Link>
                            </button>
                          </Col>
                   })}
              </div>
            </Col>

              <Col sm={6} className="navName">
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {name}
                  </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem onClick={logout}>
                      Đăng Xuất
                        
                      </DropdownItem>
                    </DropdownMenu>
              </UncontrolledDropdown>
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
