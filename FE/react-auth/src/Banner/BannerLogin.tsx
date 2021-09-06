import React from 'react'

interface PropsBanner{
    name:string;
}

export default function BannerLogin({name}:PropsBanner) {
    return (
        <>
        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
        <img src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
        <h1>{name}</h1>
        <p className="font-italic text-muted mb-0">Create a minimal registeration page using Bootstrap 4 HTML form elements.</p>
        <p className="font-italic text-muted">Snippet By <a href="https://bootstrapious.com" className="text-muted">
            <u>Bootstrapious</u></a>
        </p>
        </div>
        </>
    )
}
