import React from 'react'
import { Link } from 'react-router-dom';
import Banner1 from '../Banner/Banner1';
import '../Css/Details.css';
import Footer from '../Footer/Footer';
import ListChapter from '../ForDetailts/ListChapter';



export default function Details() {
    return (
        <>
        {/* <div className="container-fluid">
            <div className="frame1">
                <Link to="/" className="site-name">
                  <img className="logo" src="logo192.png" alt="" style={{width: '80px'}} />
                </Link>
            </div>
        </div> */}
        <Banner1 namecourse='NameCourse' des='Mô tả sơ lược' />
        <ListChapter />
        <Footer />
        </>
    )
}
