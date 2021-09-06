import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
const Footer = ()=>{
    const a = {
        color: '#ffff'
    }
    return(
        <Fragment>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Quản lý người dùng
            </button>
            <pre></pre>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Quản lý giáo viên</button>
            <pre></pre>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Quản lý menter</button>
            <pre></pre>
            <button className="w-100 btn btn-lg btn-primary" type="submit"><Link to="/addcourse" style={a}>Thêm khóa học</Link></button>
        </Fragment>
    )
}

export default Footer;