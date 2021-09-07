import React, {SyntheticEvent, useState} from "react";
import { Link, Redirect } from "react-router-dom";
import { stringify } from "uuid";

const styleResetPass = {
    cardP: {
        padding: '30px 30px',
        
    },
}

const ResetPassword = (props: {setName: (name:string) => void}) => {
    const [redirect, setRedirect] = useState(false);
    const [confirmNewPassword, setconfirmNewPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const token = GetURLParameter('token')
        const email = GetURLParameter('email')
        const response = await fetch('https://lmsg03.azurewebsites.net/api/Authenticate/resetpassword',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                newPassword,
                confirmNewPassword,
                email,
                token
            })
        });

        const content = await response.json();

        if(content.status === '200')
        {
            setRedirect(true);
            alert(content.message)
            //localStorage.setItem('username', content.message)
        }else
        {
            setRedirect(false);
            alert(content.message)
        }     
    }
    const GetURLParameter = (sParam:any) =>{
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return (sParameterName[1].toString());
            }
        }
    }
    if(redirect)
        return <Redirect to="/login"/>;

    return (
        <div className="form-signin">
            <div className="card" style={styleResetPass.cardP}>
                <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Reset Password</h1>
                <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setnewPassword(e.target.value)}/>
                <input type="password" className="form-control" placeholder="Confirm password" required
                onChange={e => setconfirmNewPassword(e.target.value)}/>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>                             
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

