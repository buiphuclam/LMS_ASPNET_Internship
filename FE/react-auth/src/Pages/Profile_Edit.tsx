import React, {SyntheticEvent, useEffect, useState} from "react"
import { Redirect } from "react-router-dom";
import App from "../App";
import { Input, MenuItem } from "@material-ui/core";
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

  const Profile_Edit = (props: {setName: (name:string) => void}) =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [firstName_c, setFirstName_c] = useState('');
    const [lastName_c, setLastName_c] = useState('');
    const [birthDay_c, setBirthday_c] = useState('');
    const [nationality_c, setnationalCity_c] = useState('');
    const [livingCity_c, setlivingCity_c] = useState('');
    const [birthCity_c, setbirthCity_c] = useState('');
    const [phoneNumber_c, setphoneNumber_c] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDay, setBirthday] = useState('');
    const [nationality, setnationalCity] = useState('');
    const [livingCity, setlivingCity] = useState('');
    const [birthCity, setbirthCity] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [redirect, setRedirect] = useState(false);
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
                setFirstName_c(content.data.firstName)
                setLastName_c(content.data.lastName)
                setBirthday_c(content.data.birthDay)
                setnationalCity_c(content.data.nationality)
                setlivingCity_c(content.data.livingCity)
                setbirthCity_c(content.data.birthCity)
                setphoneNumber_c(content.data.phoneNumber)
              }
      }    
      )();
  });
    const handleChangeSave = async (e: SyntheticEvent) => {
      e.preventDefault();

        const response = await fetch('https://lmsg03.azurewebsites.net/api/User/user/updateprofile',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              firstName,
              lastName,
              birthDay,
              nationality,
              livingCity,
              birthCity,
              phoneNumber
            })
        });

        const content = await response.json();
        if(content.message ==='Success!')
        {
          setRedirect(true);
          alert("Cập nhật profile thành công !")
        }
        else alert("Cập nhật profile thất bại !")
      }

    if(redirect)
      return <Redirect to="/Profile" />;
    return (
            // <form>
            // <h1 className="h3 mb-3 fw-normal">Here is your Profile </h1>
            // <table>
            // <thead>
            //     <tr  className="form-signin">
            //     <label>Your Name :</label> 
            //         <ul className ="form-control" id="name_text">name</ul>
            //         </tr>
            //     <tr  className="form-signin">
            //         Your Sex :
            //         <ul className ="form-control" id="sex_text">sex</ul>
            //         </tr>
            //     <tr  className="form-signin">
            //         Your PhoneNumber :
            //         <ul className ="form-control" id="phone_text">phone</ul>
            //         </tr>
            //     <tr  className="form-signin">
            //         Your Address :
            //         <ul className ="form-control" id="address_text">address</ul>
            //     </tr>
            //     <tr  className="form-signin">
            //         Your Role :
            //         <ul className ="form-control" id="role_text">role</ul>
            //         </tr>
            //     </thead>
            // </table>
            // <button className="w-100 btn btn-lg btn-primary" onClick={handleEdit}>Edit</button>
            // </form>   

          <div className="card_edit">
						<div className="card-body">
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">First Name</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control" defaultValue={firstName_c}
                    onChange = {e => setFirstName(e.target.defaultValue)}/>
								</div>
							</div>
              <div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Last Name</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control" defaultValue={lastName_c}
                    onChange = {e => setLastName(e.target.value)}/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Birthday</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control" defaultValue={birthDay_c}
                    onChange = {e => setBirthday(e.target.value)}/>
								</div>
							</div>
							{/* <div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Phone</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control"
                    onChange = {e => setUserPhone(e.target.value)}/>
								</div>
							</div> */}
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">nationalCity</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control" defaultValue={nationality_c}
                    onChange = {e => setnationalCity(e.target.value)}/>
								</div>
							</div>
              <div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">livingCity</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control" defaultValue={livingCity_c}
                    onChange = {e => setlivingCity(e.target.value)}/>
								</div>
							</div>
              <div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">birthCity</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control" defaultValue={birthCity_c}
                    onChange = {e => setbirthCity(e.target.value)}/>
								</div>
							</div>
              <div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">PhoneNumber</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control" defaultValue={phoneNumber_c}
                    onChange = {e => setphoneNumber(e.target.value)}/>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-3"></div>
								<div className="col-sm-9 text-secondary">
                  <button className="w-100 btn btn-lg btn-primary" onClick={handleChangeSave}>Save Your Changes</button>
								</div>
							</div>
						</div>
            </div>
    );
};

export default Profile_Edit;

