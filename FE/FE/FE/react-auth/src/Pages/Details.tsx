import React from 'react'
import Nav from '../components/Nav'
import { Link } from 'react-router-dom';
import './Css/Details.css';
import Banner from '../Banner/Banner1';
import Footer from '../Footer/Footer';
import ListChapter from './ForDetailts/ListChapter';


export default function Details() {
    return (
        <>
        <div className="container-fluid">
            <div className="frame1">
                <Link to="/" className="site-name">
                  <img className="logo" src="logo192.png" alt="" style={{width: '80px'}} />
                </Link>
            </div>
        </div>
        <Banner namecourse='NameCourse' des='Mô tả sơ lược' />
        <ListChapter />
        <Footer />
        </>
    )
}
