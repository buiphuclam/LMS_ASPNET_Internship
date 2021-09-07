import React from 'react'
import './Banner.css';
interface PropsBanner{
    namecourse: string;
    des: string;
}
const cardStyle = {
    margin: '20px 0px',
    padding: '8px 16px'
}

export default function Banner1({namecourse, des}:PropsBanner) {
    return (
        <div className="mid">
            <div className="banner">
                <div className="nen1" >
                  <img className="logo1" src="./imgs/banner1.jpg" alt="banner"  />  
                </div>
                <div className="title">
                    <div className="card" style={cardStyle}>
                        <div className="card-title" >{namecourse}</div>
                    </div>
                    <div className="card" style={cardStyle}>
                        <div className="card-text " >{des}</div>
                    </div>
                </div>
                
            </div>
        </div>
            
    )
}
