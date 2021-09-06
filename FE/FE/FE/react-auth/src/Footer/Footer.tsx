import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="text-center text-white" style={{backgroundColor: '#fff'}}>
            {/* Grid container */}
            <div className="container pt-4">
                {/* Section: Social media */}
                <section className="mb-4">
                  {/* Facebook */}
                  <Link className="btn btn-link btn-floating btn-lg text-dark m-1" to="/" role="button" data-mdb-ripple-color="dark"><i className="fa fa-facebook-f" /></Link>
                  {/* Twitter */}
                  <Link className="btn btn-link btn-floating btn-lg text-dark m-1" to="/" role="button" data-mdb-ripple-color="dark"><i className="fa fa-twitter" /></Link>
                  {/* Google */}
                  <Link className="btn btn-link btn-floating btn-lg text-dark m-1" to="/" role="button" data-mdb-ripple-color="dark"><i className="fa fa-google" /></Link>
                  {/* Instagram */}
                  <Link className="btn btn-link btn-floating btn-lg text-dark m-1" to="/" role="button" data-mdb-ripple-color="dark"><i className="fa fa-instagram" /></Link>
                  {/* Linkedin */}
                  <Link className="btn btn-link btn-floating btn-lg text-dark m-1" to="/" role="button" data-mdb-ripple-color="dark"><i className="fa fa-linkedin" /></Link>
                  {/* Github */}
                  <Link className="btn btn-link btn-floating btn-lg text-dark m-1" to="/" role="button" data-mdb-ripple-color="dark"><i className="fa fa-github" aria-hidden="true" /></Link>
                </section>
                {/* Section: Social media */}
            </div>
            {/* Grid container */}
            <div className="text-center text-dark p-3" style={{backgroundColor: 'rgba(74, 72, 147, 0.71)'}}>
                © 2020 :
            <Link className="text-dark" to="/">LMS.com</Link>
            </div>
        </footer>
    )
}
