import React, {SyntheticEvent, useState} from "react"
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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDay, setBirthday] = useState('');
    const [Phone, setUserPhone] = useState('');
    const [nationalCity, setnationalCity] = useState('');
    const [livingCity, setlivingCity] = useState('');
    const [birthCity, setbirthCity] = useState('');
    const [redirect, setRedirect] = useState(false);
    const handleChangeSave = async (e: SyntheticEvent) => {
      e.preventDefault();

        const response = await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/user/updateprofile',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
              firstName,
              lastName,
              birthDay,
              nationalCity,
              livingCity,
              birthCity      
            })
        });

        const content = await response.json();
        if(content.message ==='Success!')
        {
          alert("Cập nhật profile thành công !")
        }
        else alert("Cập nhật profile thất bại !")
      }

    if(redirect)
      return <Redirect to="/" />;
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
      <div className="form-profile">
          <div className="card_edit">
						<div className="card-body">
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">First Name</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control"
                    onChange = {e => setFirstName(e.target.value)}/>
								</div>
							</div>
              <div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Last Name</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control"
                    onChange = {e => setLastName(e.target.value)}/>
								</div>
							</div>
							<div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">Birthday</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control"
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
									<input type="text" className="form-control"
                    onChange = {e => setnationalCity(e.target.value)}/>
								</div>
							</div>
              <div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">livingCity</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control"
                    onChange = {e => setlivingCity(e.target.value)}/>
								</div>
							</div>
              <div className="row mb-3">
								<div className="col-sm-3">
									<h6 className="mb-0">birthCity</h6>
								</div>
								<div className="col-sm-9 text-secondary">
									<input type="text" className="form-control"
                    onChange = {e => setbirthCity(e.target.value)}/>
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
        </div>
    );
};

export default Profile_Edit;

