import Cookies from 'universal-cookie';
import React, {useEffect,useState,useLayoutEffect} from "react"
import { BrowserRouter, Route,Redirect } from 'react-router-dom';

import {
  Container,
} from "reactstrap"

import Nav from "./components/Nav/Nav"

//Import login
import Login from 'pages/Authentication/Login'

//SystemAdmin
import QuanLyNguoiDung from 'pages/SystemAdmin/QuanLyNguoiDung/Users_List'
import QuanLyClassAdmin from 'pages/SystemAdmin/QuanLyClassAdmin/ClassAdmins'
import QuanLyHocSinh from 'pages/SystemAdmin/QuanLyHocSinh/Students_List'
import QuanLyGiaoVien from 'pages/SystemAdmin/QuanLyTeacher/Teachers_List'
import QuanLyInstructor from 'pages/SystemAdmin/QuanLyInstructor/Instructors_List'

//Instructor
import Dashboard from './pages/Dashboard/index';
import ThemKH from 'pages/Instructor/ThemKH'
import DanhSachQuizz from 'pages/Instructor/DanhSachQuizz/ThemQuizz'

// ClassAdmin
import DanhSachSection from 'pages/ClassAdmin/DanhSachSection/DanhSachSection';


const App = props => {

  const [name,setName] = useState('')
  const [token,setToken] = useState('')
  const [role,setRole] =  useState(0)
  const [isAuth,setIsAuth] = useState(false)
  
  
  const listNavSA = [{name: 'QL Người Dùng', path: 'quanlynguoidung'},
                    {name: 'QL Class Admin', path: 'quanlyclassadmin'},
                    {name: 'QL Instructor', path: 'quanlyinstructor'},
                    {name: 'QL Giáo viên', path: 'quanlygiaovien'},
                    {name: 'QL Học Sinh', path: 'quanlyhocsinh'}];
  const listNavCA = [{name: 'Xem lớp học', path:'danhsachsection'}];
  const listNavINS = [{name: 'Xem khóa học', path: 'danhsachkhoahoc'},{name: 'Thêm khóa học', path: 'themkh'},{name: 'Danh sách Quizz', path:'danhsachquizz'}];


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
                if(name !== '')
                {
                  setIsAuth(true)
                  console.log(isAuth)
                }
                
              }
              
              
              const myHeaders = new Headers();
              myHeaders.append('Content-Type', 'application/json')
              if(jwt)
              {
                setToken(jwt);
                myHeaders.append('Authorization','Bearer ' + token);
              }
              
              const response2 = await fetch ('https://lmsg03.azurewebsites.net/api/Authenticate/authorize', {
                method: 'GET',
                headers: myHeaders,
                credentials: 'include'
              });
              const content2 = await response2.json()
              
              setRole(content2.data)
              console.log(role)    
      }    
      )();
      },[name,token,role,isAuth]);

      console.log('3- ' + token)
  return (
    // 1 instructor // 4 classadmin // 5 systemadmin
    <BrowserRouter>
    
      {(role === 1) ? <Nav name={name} setName={setName} listNav={listNavINS} setIsAuth={setIsAuth} /> : (role=== 4) ? <Nav name={name} setName={setName} listNav={listNavCA} setIsAuth={setIsAuth} /> 
      : (role===5) ? <Nav name={name} setName={setName} listNav={listNavSA} setIsAuth={setIsAuth} /> : <Nav name={name} setName={setName} listNav={[]} setIsAuth={setIsAuth} /> }
        <Container fluid={false}>

       
      {!isAuth ? <Route path="/login" exact component={() => <Login setName={setName}/> }/> : 
        (role === 1) ?
      <>
          <Route path="/danhsachkhoahoc"  component={() => <Dashboard/>}/>
          <Route path="/themkh" component={() => <ThemKH/>}/>
          <Route path="/danhsachquizz"  component={() => <DanhSachQuizz/>}/>
          </>
          : (role=== 4) ?
           <Route path="/danhsachsection" component={() => <DanhSachSection/>}/>
        : (role===5) ? 
          <>
          <Route path="/quanlynguoidung" exact component={() => <QuanLyNguoiDung/>}/>
          <Route path="/quanlygiaovien"  component={() => <QuanLyGiaoVien/>}/>
          <Route path="/quanlyclassadmin"  component={() => <QuanLyClassAdmin/>}/>
          <Route path="/quanlyhocsinh"  component={() => <QuanLyHocSinh/>}/>
          <Route path="/quanlyinstructor"  component={() => <QuanLyInstructor/>}/>
          </>
         : <Redirect to="/login" /> 
        }
      

         <Route path="/">
          {
          (role === 1) ? 
          <Redirect to="/danhsachkhoahoc" />
          : (role=== 4) ?  <Redirect to="/danhsachsection" />
          : (role=== 5) ?
             <Redirect to="/quanlynguoidung" /> 
          :   <Redirect to="/login" /> 
          }
          </Route>

      </Container>
      </BrowserRouter>
  )
}

export default (App)
