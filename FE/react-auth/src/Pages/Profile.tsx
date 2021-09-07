import React, {SyntheticEvent, useState, useEffect} from "react"
import { Redirect } from "react-router-dom";
import App from "../App";
import { MenuItem } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import SelectInput from "@material-ui/core/Select/SelectInput";
import './profile_style.css';


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

const Profile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const handleEdit = () =>{

    }

    

    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/user',{
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                
                const content = await response.json();
    
                if(content.message ==='Success!')
                {
                  setName(content.data.userName)
                  setEmail(content.data.email)
                }
        }    
        )();
    });

    return (
      <div className="form-profile" >
            <div className="card1 mb-6">
              <h3 className="tieude-font">Your Profile</h3>
              <div className="card-body">
                <div className="card-item1 row">
                  <div className="col-sm-4">
                    <h6 className="mb-6">UserName</h6>
                  </div>
                  <div className="col-sm-8 text-secondary">
                    {name}
                  </div>
                </div>
                <div className="card-item1 row">
                  <div className="col-sm-4">
                    <h6 className="mb-6">Email</h6>
                  </div>
                  <div className="col-sm-8 text-secondary">
                    {email}
                  </div>
                </div>
                <div className="card-item1 row">
                  <div className="col-sm-4">
                    <h6 className="mb-6">Phone</h6>
                  </div>
                  <div className="col-sm-8 text-secondary">
                    (239) 816-9029
                  </div>
                </div>
                <div className="card-item1 row">
                  <div className="col-sm-4">
                    <h6 className="mb-6">Address</h6>
                  </div>
                  <div className="col-sm-8 text-secondary">
                    Bay Area, San Francisco, CA
                  </div>
                </div>
                <div>
                  <div className="card-div" >
                    <button className="btn btn-info" ><a className="btn btn-info " target="__blank" href="/">Home</a></button>
                      <button className="btn btn-info" ><a className="btn btn-info " target="__blank" href="/Profile_Edit">Edit</a></button>
                      <button className="btn btn-info"  ><a className="btn btn-info " target="__blank" href="/change_password">Change Password</a></button>
                  </div>
                </div>
              </div>
            </div>
          {/* // <div className="container-fuild">
          //   <div className="card login-card">
          //               <div className="tieude-font">Your Profile</div>

          //               <form >
          //               <div className="card-item">
          //                   <span margin-right= "20px"> Email:</span>
          //                   <span>
          //                       <div className="card-lable">
          //                           <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          //                               <path d="M19.6757 4.14709H5.67566C4.88001 4.14709 4.11695 4.46317 3.55434 5.02577C2.99173 5.58838 2.67566 6.35145 2.67566 7.14709V17.1471C2.67566 17.9427 2.99173 18.7058 3.55434 19.2684C4.11695 19.831 4.88001 20.1471 5.67566 20.1471H19.6757C20.4713 20.1471 21.2344 19.831 21.797 19.2684C22.3596 18.7058 22.6757 17.9427 22.6757 17.1471V7.14709C22.6757 6.35145 22.3596 5.58838 21.797 5.02577C21.2344 4.46317 20.4713 4.14709 19.6757 4.14709ZM19.0057 6.14709L12.6757 10.8971L6.34566 6.14709H19.0057ZM19.6757 18.1471H5.67566C5.41044 18.1471 5.15609 18.0417 4.96855 17.8542C4.78102 17.6667 4.67566 17.4123 4.67566 17.1471V7.39709L12.0757 12.9471C12.2488 13.0769 12.4593 13.1471 12.6757 13.1471C12.892 13.1471 13.1026 13.0769 13.2757 12.9471L20.6757 7.39709V17.1471C20.6757 17.4123 20.5703 17.6667 20.3828 17.8542C20.1952 18.0417 19.9409 18.1471 19.6757 18.1471Z" fill="black"/>
          //                           </svg>
          //                           <a className="card-a">
          //                             {email}
          //                           </a>
          //                       </div>
                                
          //                   </span>
          //               </div>
          //               <div className="card-item">
          //                   <span margin-right= "20px"> Username:</span>
          //                   <span>
          //                       <div className="card-lable">
          //                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          //                               <path d="M6 17C6 15 10 13.9 12 13.9C14 13.9 18 15 18 17V18H6V17ZM15 9C15 9.79565 14.6839 10.5587 14.1213 11.1213C13.5587 11.6839 12.7956 12 12 12C11.2044 12 10.4413 11.6839 9.87868 11.1213C9.31607 10.5587 9 9.79565 9 9C9 8.20435 9.31607 7.44129 9.87868 6.87868C10.4413 6.31607 11.2044 6 12 6C12.7956 6 13.5587 6.31607 14.1213 6.87868C14.6839 7.44129 15 8.20435 15 9ZM3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5Z" fill="black"/>
          //                           </svg>
          //                           <a className="card-a">
          //                             {name}
          //                           </a>
          //                       </div>
                                
          //                   </span>
          //               </div>
          //               <div className="card-item">
          //                   <span margin-right= "20px"> Địa chỉ:</span>
          //                   <span>
          //                       <div className="card-lable">
          //                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          //                               <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          //                               <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          //                           </svg>                            
          //                           <a className="card-a">
          //                             844 Hoàng Diệu
          //                           </a>
          //                       </div>
          //                   </span>
          //               </div>
          //               <div className="card-item">
          //                   <span margin-right="20px">Số điện thoại:</span>
          //                   <span>
          //                       <div className="card-lable">
          //                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          //                               <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          //                               <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          //                           </svg>                            
          //                           <a className="card-a">
          //                             084448444
          //                           </a>
          //                       </div>
          //                   </span>
          //               </div>
          //               <div className="card-item" justify-content="space-around">
          //                 <a className="card-button btn" href="/">Home</a>
          //                   <a className="card-button btn" href="/Profile_Edit">Edit</a>
          //                   <a className="card-button btn" href="/change_password">Change Password</a>
          //               </div>
          //               </form>
          //           </div>
          //         </div> */}
          </div>
    );
};

export default Profile;