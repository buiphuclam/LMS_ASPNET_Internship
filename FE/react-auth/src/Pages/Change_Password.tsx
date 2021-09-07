import React, {SyntheticEvent, useState, useEffect} from "react"
import { Redirect } from "react-router-dom";
import App from "../App";
import { MenuItem } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import SelectInput from "@material-ui/core/Select/SelectInput";
import './profile_style.css';
import './Login-Signin.css';


const styles = {
    toggleDiv: {
      maxWidth: 300,
      marginTop: 40,
      marginBottom: 5
    },
    toggleLabel: {
      color: grey,
      fontWeight: 100
    },
    buttons: {
      marginTop: 30,
      float: 'right'
    },
    saveButton: {
      marginLeft: 5
    }
  };

  const Change_Password = (props: {setName: (name:string) => void}) => {
    const [username, setUsername] = useState('');
    const [currentPassword, setPasswordOld] = useState('');
    const [newPassword, setPasswordNew] = useState('');
    const [confirmNewPassword, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username,
                currentPassword,
                newPassword,
                confirmNewPassword
            })
        });

        setRedirect(false);
        const content = await response.json();
        if(content.message === 'Success!')
        {
          setRedirect(true);
          alert("Đổi mật khẩu thành công!")
        }
        else alert("Đổi mật khẩu thất bại! Vui lòng thử lại !")
    }

    // if(redirect)
    //     return <Redirect to="/"/>;

    return (  
            // <div className="card mb-6" onSubmit={submit}>
            //   <h3 className="tieude-font">Change Password</h3>
            //   <div className="card-body">
            //     <div className="row">
            //       <div className="col-sm-9">
            //         <h6 className="mb-6">UserName</h6>
            //       </div>
            //       <div className="col-sm-24 text-secondary"><input className="card-input"
            //         onChange = {e => setUsername(e.target.value)}/>
            //       </div>
            //     </div>
            //     <div className="row">
            //       <div className="col-sm-9">
            //         <h6 className="mb-6">Current Password</h6>
            //       </div>
            //       <div className="col-sm-24 text-secondary"><input className="card-input"
            //         onChange = {e => setPasswordOld(e.target.value)}/>
            //         </div>
            //     </div>
            //     <div className="row">
            //       <div className="col-sm-9">
            //         <h6 className="mb-6">New Password</h6>
            //       </div>
            //       <div className="col-sm-24 text-secondary"><input className="card-input"
            //         onChange = {e => setPasswordNew(e.target.value)}/>
            //         </div>
            //     </div>
            //     <div className="row">
            //       <div className="col-sm-9">
            //         <h6 className="mb-6">Confirm new password</h6>
            //       </div>
            //       <div className="col-sm-24 text-secondary" max-width="400px"><input className="card-input"
            //         onChange = {e => setPasswordConfirm(e.target.value)}/>
            //         </div>
            //     </div>
            //     <div className="row">
            //       <div className="col-sm-12">
            //         <div className="form-group row" justify-content="center">
                      
            //           <div className="col-md-6"><a className="btn btn-info " target="__blank" href="/Profile">Cancel</a></div>
            //           <div className="col-md-6"><a type="submit" className="btn btn-info " target="__blank" justify-content= "flex-end">Cofirm</a></div>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            <div className="form-change_pass">
            <div className="container-fuild">
            <div className="card login-card">
                <div className="tieude-font">Đổi Mật Khẩu</div>
    
                <form onSubmit={submit}>
                {/* <div id="alert" className="card-item alert alert-danger"  style="display: none;" >
                    Sai email hoặc mật khẩu. Vui lòng nhập lại! 
                </div>  */}
                <div className="card-item">
                    <span margin-right="20px"> UserName:</span>
                    <span>
                        <div className="card-lable">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.6757 4.14709H5.67566C4.88001 4.14709 4.11695 4.46317 3.55434 5.02577C2.99173 5.58838 2.67566 6.35145 2.67566 7.14709V17.1471C2.67566 17.9427 2.99173 18.7058 3.55434 19.2684C4.11695 19.831 4.88001 20.1471 5.67566 20.1471H19.6757C20.4713 20.1471 21.2344 19.831 21.797 19.2684C22.3596 18.7058 22.6757 17.9427 22.6757 17.1471V7.14709C22.6757 6.35145 22.3596 5.58838 21.797 5.02577C21.2344 4.46317 20.4713 4.14709 19.6757 4.14709ZM19.0057 6.14709L12.6757 10.8971L6.34566 6.14709H19.0057ZM19.6757 18.1471H5.67566C5.41044 18.1471 5.15609 18.0417 4.96855 17.8542C4.78102 17.6667 4.67566 17.4123 4.67566 17.1471V7.39709L12.0757 12.9471C12.2488 13.0769 12.4593 13.1471 12.6757 13.1471C12.892 13.1471 13.1026 13.0769 13.2757 12.9471L20.6757 7.39709V17.1471C20.6757 17.4123 20.5703 17.6667 20.3828 17.8542C20.1952 18.0417 19.9409 18.1471 19.6757 18.1471Z" fill="black"/>
                            </svg>
                            <input id="username" type="username" placeholder="UserName" className="card-input1" width= "400px"
                                onChange = {e => setUsername(e.target.value)}/>
                        </div>
                        
                    </span>
                </div>
                <div className="card-item">
                    <span margin-right="20px"> Current Password:</span>
                    <span>
                        <div className="card-lable">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                            
                            <input id="cur_pass" type="password" placeholder="**********" className="card-input1" width="400px"
                                onChange = {e => setPasswordOld(e.target.value)}/>
                        </div>
                    </span>
                </div>
                <div className="card-item">
                    <span margin-right="20px"> New Password:</span>
                    <span>
                        <div className="card-lable">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                            
                            <input id="new_pass" type="password" placeholder="**********" className="card-input1" width="400px"
                                onChange = {e => setPasswordNew(e.target.value)}/>
                        </div>
                    </span>
                </div>
                <div className="card-item">
                    <span style={{marginRight: '20px'}}> Confirm new Password:</span>
                    <span>
                        <div className="card-lable">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                            
                            <input id="confirm_new_pass" type="password" placeholder="**********" className="card-input1" width="400px"
                                onChange = {e => setPasswordConfirm(e.target.value)}/>
                        </div>
                    </span>
                </div>
                {/* <div className="card-item" justify-content= "space-around;">
                    <a href="/register">Đăng ký</a>
                    <a href="/">Quên mật khẩu</a>
                </div> */}
                <div className="card-item" justify-content= "space-around">
                    <a className="card-button-huy btn" href="/Profile">Hủy</a>
                    {/* <button id="btn-huy" className="card-button-huy btn" onSubmit={}>Hủy</button> */}
                    <button id="btn-dn" type="submit" className="card-button btn">Xác nhận</button>
                </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Change_Password;