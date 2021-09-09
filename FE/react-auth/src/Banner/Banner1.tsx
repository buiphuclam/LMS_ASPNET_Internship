import React from 'react'
import './Banner.css';
interface PropsBanner{
    courseName: any;
    courseShortDetail: any;
}
const cardStyle = {
    margin: '20px 0px',
    padding: '8px 16px'
}

export default function Banner1(props: any) {
    const todo = props.course
    return (
        <div className="mid">
            <div className="banner">
                <div className="nen1" >
                  <img className="logo1" src="https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg" alt="banner"  />  
                </div>
                <div className="title">
                    <div className="card" style={cardStyle}>
                        <div className="card-title" >{todo.courseName}</div>
                    </div>
                    <div className="card" style={cardStyle}>
                        <div className="card-text " >{todo.courseShortDetail}</div>
                    </div>
                </div>
                
            </div>
        </div>
            
    )
}
