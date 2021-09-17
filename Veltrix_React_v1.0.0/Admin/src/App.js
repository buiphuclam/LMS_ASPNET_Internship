import PropTypes from 'prop-types'
// import Cookies from 'js-cookie'; rac vl
import Cookies from 'universal-cookie';
import React, {useEffect,useState,useLayoutEffect} from "react"
import { BrowserRouter, Route } from 'react-router-dom';

import {
  Form,
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  CardSubtitle,
  Container,
  Collapse,
} from "reactstrap"

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"
import Nav from "./components/Nav/Nav"

// Import scss
import "./assets/scss/theme.scss"
import Dashboard from './pages/Dashboard/index';

import DanhSachSection from 'pages/ClassAdmin/DanhSachSection/DanhSachSection';
import DanhSachQuizz from 'pages/Instructor/DanhSachQuizz/ThemQuizz'

import Login from 'pages/Authentication/Login'


// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

// import fakeBackend from "./helpers/AuthType/fakeBackend"

// // Activating fake backend
// fakeBackend()

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// }

// init firebase backend
// initFirebaseBackend(firebaseConfig)
// const useStyle = {
//   formControl: {
    
//   }
// }

const App = props => {

  const [name,setName] = useState('')
  const [token,setToken] = useState('')
  const [role,setRole] =  useState(0)
  
  
  const listNavSA = [{name: 'Quản lý người dùng'}];
  const listNavCA = [{name: 'Quản lý giáo viên'}, {name: 'Danh sách lớp học'}];
  const listNavINS = [{name: 'Quản lý'},{name: 'Danh sách khóa học'},{name: 'Thêm khóa học'},{name: 'Danh sách Quizz'}];
  const listDetail =[];

  

    useLayoutEffect(() =>  {
      const cookies = new Cookies();
      let jwt = cookies.get("jwt_r");
      (
        
          async () => {  
            
            console.log('1- ' + jwt)
            // let abc = Cookies.set('daylacookie', 'asdasdasdasdasdasd')
            // let cde = Cookies.get(cc)
            // console.log(abc.get())
              const link = 'https://lmsg03.azurewebsites.net/api/Authenticate/user'
              const response = await fetch(link,{
                  method: 'GET',
                  headers: {'Content-Type': 'application/json'},
                  credentials: 'include'
              });
              
              const content = await response.json();
              if(content.status === 200)
              {
                setName(content.data.userName)
                console.log(content.data.userName)
              }
              
              
              // const myHeaders = new Headers();
              // myHeaders.append('Content-Type', 'application/json')
              // if(jwt)
              // {
              //   setToken(jwt);
              //   myHeaders.append('Authorization','Bearer ' + token);
              // }
              
              // const response2 = await fetch ('https://lmsg03.azurewebsites.net/api/Authenticate/authorize', {
              //   method: 'GET',
              //   headers: myHeaders,
              //   credentials: 'include'
              // });
              // const content2 = await response2.json()
              // setRole(content2.data)

              // console.log(content2.data)
              console.log('2- ' + jwt)
              const myHeaders = new Headers();
                  myHeaders.append('Content-Type', 'application/json');
                  if(jwt)
                  {
                    setToken(jwt)
                    myHeaders.append('Authorization', 'Bearer ' + token);
                  }
                  console.log(token);
                const response2 = await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/authorize',{
                    method: 'GET',
                    headers: myHeaders,
                    credentials: 'include'
              // setRole(await response2.json());
                }
                  
                )
                console.log((await response2.json()).data)
              
              
              
      }    
      )();
      },[name,token,role]);

      console.log('3- ' + token)
  return (
    
    <BrowserRouter>
      {(role === 1) ? <Nav name={name} setName={setName} listNav={listNavINS} /> : (role== 4) ? <Nav name={name} setName={setName} listNav={listNavCA} /> 
      : (role==5) ? <Nav name={name} setName={setName} listNav={listNavSA} /> : <Nav name={name} setName={setName} listNav={[]} /> }
        <Container fluid={false}>
        
        <Route path="/" exact component={() => <Dashboard/>}/>
        <Route path="/danhsachsection" exact component={() => <DanhSachSection/>}/>
        <Route path="/danhsachquizz" exact component={() => <DanhSachQuizz/>}/>
        <Route path="/login" exact component={() => <Login setName={setName}/>}/>
        
        {/* <Route path="/" component={() => <Dashboard/>}/>
        <Route path="/" component={() => <Dashboard/>}/> */}
        {/* <Route path="/profile" component={() => <Profile/>}/>
        <Route path="/mycourse/:n" component={() => <MyCourse/>}/>
        <Route path="/course" component={() => <Course/>}/>
        <Route path="/course" component={() => <Course sectionId='null'/>}/>
        <Route path="/statistic/:n" component={() => <Statistic/>}/> */}

      {/* <Footer/> */}
      </Container>
      </BrowserRouter>
  )
}

export default (App)
