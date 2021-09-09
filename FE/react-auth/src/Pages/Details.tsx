import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Banner1 from '../Banner/Banner1';
import '../Css/Details.css';
import Footer from '../Footer/Footer';
import ListChapter from '../ForDetailts/ListChapter';



export default function Details(props: any) { 
    const [Course, setCourse] = useState([])
    const GetURLParameter = (sParam:any) =>{
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return (sParameterName[1].toString());
            }
        }
    }
    useEffect(() =>  {
        (
            async () => {
                const id = GetURLParameter('id')
                const link = 'https://lmsg03.azurewebsites.net/api/Course/getcourse?id='+id
                const response = await fetch(link,{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                
                const content = await response.json();
                setCourse(content.data)    
        }    
        )();
        });
    return (
        <>
        <div className="container-fluid">
            <div className="frame1">
                <Link to="/" className="site-name">
                  <img className="logo" src="logo192.png" alt="" style={{width: '80px'}} />
                </Link>
            </div>
        </div>
        <Banner1  course={Course}/>
        <ListChapter />
        <Footer />
        </>
    )
}
