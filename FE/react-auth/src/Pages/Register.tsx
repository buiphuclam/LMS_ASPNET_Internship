import React, { SyntheticEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Login-Signin.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // const response = 

        await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                email,
                password,
                confirmpassword
            })
        });
        setRedirect(true);
        if(username || password || email || confirmpassword ==='')
        {
            alert("Bạn vui lòng nhập đầy đủ thông tin !")
        }
        // const content = await response.json();
    }

    if(redirect)
        return <Redirect to="/login"/>;

    return (

        <div className="container-fuild">
            {/* <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <input type="username" className="form-control" placeholder="Username" required
                onChange={e => setUsername(e.target.value)}/>
            <input type="email" className="form-control" placeholder="name@example.com" required
                onChange={e => setEmail(e.target.value)}/>
            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}/>
            <input type="password" className="form-control" placeholder="Confirm password" required
                onChange={e => setConfirmpassword(e.target.value)}/>
            <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
            </form> */}
                    <div className="card login-card">
                        <div className="tieude-font">Đăng Ký</div>

                        <form onSubmit={submit}>
                        <div className="card-item">
                            <span> Email:</span>
                            <span>
                                <div className="card-lable">
                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.6757 4.14709H5.67566C4.88001 4.14709 4.11695 4.46317 3.55434 5.02577C2.99173 5.58838 2.67566 6.35145 2.67566 7.14709V17.1471C2.67566 17.9427 2.99173 18.7058 3.55434 19.2684C4.11695 19.831 4.88001 20.1471 5.67566 20.1471H19.6757C20.4713 20.1471 21.2344 19.831 21.797 19.2684C22.3596 18.7058 22.6757 17.9427 22.6757 17.1471V7.14709C22.6757 6.35145 22.3596 5.58838 21.797 5.02577C21.2344 4.46317 20.4713 4.14709 19.6757 4.14709ZM19.0057 6.14709L12.6757 10.8971L6.34566 6.14709H19.0057ZM19.6757 18.1471H5.67566C5.41044 18.1471 5.15609 18.0417 4.96855 17.8542C4.78102 17.6667 4.67566 17.4123 4.67566 17.1471V7.39709L12.0757 12.9471C12.2488 13.0769 12.4593 13.1471 12.6757 13.1471C12.892 13.1471 13.1026 13.0769 13.2757 12.9471L20.6757 7.39709V17.1471C20.6757 17.4123 20.5703 17.6667 20.3828 17.8542C20.1952 18.0417 19.9409 18.1471 19.6757 18.1471Z" fill="black"/>
                                    </svg>
                                    <input id="email" type="email" placeholder="Email" className="card-input1" width= "250px"
                                        onChange={e => setEmail(e.target.value)}/>
                                </div>
                                
                            </span>
                        </div>
                        <div className="card-item">
                            <span> Họ và tên:</span>
                            <span>
                                <div className="card-lable">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 17C6 15 10 13.9 12 13.9C14 13.9 18 15 18 17V18H6V17ZM15 9C15 9.79565 14.6839 10.5587 14.1213 11.1213C13.5587 11.6839 12.7956 12 12 12C11.2044 12 10.4413 11.6839 9.87868 11.1213C9.31607 10.5587 9 9.79565 9 9C9 8.20435 9.31607 7.44129 9.87868 6.87868C10.4413 6.31607 11.2044 6 12 6C12.7956 6 13.5587 6.31607 14.1213 6.87868C14.6839 7.44129 15 8.20435 15 9ZM3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5Z" fill="black"/>
                                    </svg>
                                    <input id="name" type="username" placeholder="Họ và tên" className="card-input1" width= "250px"
                                        onChange={e => setUsername(e.target.value)}/>
                                </div>
                                
                            </span>
                        </div>
                        <div className="card-item">
                            <span> Pass:</span>
                            <span>
                                <div className="card-lable">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                            
                                    <input id="pass" type="password" placeholder="******" className="card-input1" width= "250px"
                                        onChange={e => setPassword(e.target.value)}/>
                                </div>
                            </span>
                        </div>
                        <div className="card-item">
                            <span style={{marginRight: '20px'}}>Nhập lại Pass:</span>
                            <span>
                                <div className="card-lable">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                            
                                    <input id="confirm" type="password" placeholder="******" className="card-input1" width="250px"
                                        onChange={e => setConfirmpassword(e.target.value)}/>
                                </div>
                            </span>
                        </div>
                        <div className="card-item" justify-content= "space-around;margin: 20px 0px">
                            <a href="/login">Đăng nhập</a>
                            <a href="/">Trang chủ</a>
                        </div>
                        <div className="card-item" justify-content="space-around">
                            <a className="card-button-huy btn" href="/">Hủy</a>
                            <button type="submit" className="card-button btn">Xác nhận</button>
                        </div>
                        </form>
                    </div>
            </div>
        
    );
};

export default Register;